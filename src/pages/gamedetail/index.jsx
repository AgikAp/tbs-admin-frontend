import React, { useEffect, useState } from "react";
import PageHeader from "../../components/pageheader";
import Section from "../../components/sections";
import InputFile from "../../components/inputfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faPlus,
  faSave,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import GameInformationField from "./gameinformationfield";
import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";
import GameCustomField from "./gamecustomfield";
import {
  GET_GetGameByID,
  GET_LoadProduct,
  GET_LoadProductDetail,
  POST_CreateGame,
} from "../../fetchs/game";
import { useNavigate, useParams } from "react-router-dom";
import { POST_UploadImage } from "../../fetchs/image";
import { errorWriter } from "../../utils/errorwriter";
import { useSelector } from "react-redux";

export default function GameDetailPage({ isCreate }) {
  const state = useSelector((state) => state?.authLogin);
  const { admin } = state.admin;

  const navigate = useNavigate();
  const initialEditMode = isCreate;
  const { id } = useParams();

  const [listBaseGame, setListBaseGame] = useState([]);
  const [baseGame, setBaseGame] = useState({});
  const [baseGameSelected, setBaseGameSelected] = useState(false);

  const [baseGameDetail, setBaseGameDetail] = useState({});

  const [images, setImages] = useState({});
  const [editMode, setEditMode] = useState(initialEditMode);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [previousField, setPreviousField] = useState([]);
  const [payload, setPayload] = useState({
    status: "inactive",
    fields: [],
  });

  useEffect(() => {
    fetchLoadProduct();
  }, [isCreate]);

  useEffect(() => {
    if (!isCreate) {
      fetchGameByID();
    }
  }, [listBaseGame]);

  useEffect(() => {
    if (baseGame?.code) {
      fetchLoadProductDetail();
    }
  }, [baseGame]);

  useEffect(() => {
    const tempPayload = { ...payload };
    tempPayload.status = baseGameDetail?.status?.toLowerCase();

    tempPayload.fields = [];

    let priority = 0;
    baseGameDetail?.inputs?.map((value) => {
      let description = "";
      previousField?.forEach((data) => {
        if (data?.field === value?.name) {
          description = data?.description;
        }
      });

      const options = value?.options?.map((data) => ({
        value: data.value,
        label: data.title,
      }));

      tempPayload.fields.push({
        field: value.name,
        type: value.type,
        priority: priority++,
        placeholder: value.title,
        description: description,
        options: options,
      });
    });
    setPayload(tempPayload);
  }, [baseGameDetail]);

  const fetchGameByID = async () => {
    try {
      const response = await GET_GetGameByID(id, setLoading);
      const tempImages = { ...images };
      tempImages.image = response.image;
      tempImages.item_image = response.item_image;
      setImages(tempImages);
      setPayload(response);
      setPreviousField(response?.fields);

      let existBaseGame = listBaseGame.find(
        (value) => value?.code === response?.external_code
      );
      setBaseGame(existBaseGame);
      setBaseGameSelected(true);
      fetchLoadProductDetail(existBaseGame?.external_code);
    } catch (e) {
      errorWriter(e, setErr);
      return;
    }
  };

  const fetchLoadProduct = async () => {
    try {
      const response = await GET_LoadProduct(setLoading);
      setListBaseGame(response);
    } catch (e) {
      errorWriter(e, setErr);
      return;
    }
  };

  const fetchLoadProductDetail = async () => {
    try {
      const response = await GET_LoadProductDetail(setLoading, baseGame?.code);
      setBaseGameDetail(response);
    } catch (e) {
      errorWriter(e, setErr);
      return;
    }
  };

  const additionalGameList = (
    <>
      <button
        className="btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]"
        onClick={() => {
          const tempPayload = { ...payload };
          tempPayload.fields.push({});
          setPayload(tempPayload);
        }}
        disabled
      >
        <FontAwesomeIcon icon={faPlus} />
        Add Field
      </button>
    </>
  );

  const handleOnSubmit = async () => {
    const tempPayload = { ...payload, external_code: baseGame?.code };
    if (images?.image_file) {
      try {
        tempPayload.image = await POST_UploadImage(
          images?.image_file,
          setLoading
        );
      } catch (e) {
        errorWriter(e, setErr);
        return;
      }
    }

    if (images?.item_image_file) {
      try {
        tempPayload.item_image = await POST_UploadImage(
          images?.item_image_file,
          setLoading
        );
      } catch (e) {
        errorWriter(e, setErr);
        return;
      }
    }

    try {
      let response = await POST_CreateGame(tempPayload, setLoading);
      setPayload(response);
      navigate("/game/" + response?.id);
    } catch (e) {
      errorWriter(e, setErr);
      return;
    }
  };

  const handleChangeBaseGame = (code) => {
    let data = listBaseGame.find((value) => value?.code === code);
    if (data) {
      setBaseGameSelected(true);
      setBaseGame(data);
    }
  };

  const changeImage = (e) => {
    const selectedFile = e.target.files[0];
    const tempImages = { ...images };
    tempImages[e.target.name] = URL.createObjectURL(selectedFile);
    tempImages[e.target.name + "_file"] = selectedFile;
    setImages(tempImages);
  };

  return (
    <>
      {err && (
        <div role="alert" className="mb-5 alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{err}</span>
        </div>
      )}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-between">
          <PageHeader page={"Games Detail Page"} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <button
              className={
                admin?.accesses?.includes("GAME_UPDATE")
                  ? `btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px] ${
                      editMode ? "hidden" : "col-start-2"
                    }`
                  : "hidden"
              }
              onClick={() => setEditMode(!editMode)}
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </button>
            <button
              className={`btn btn-sm lg:btn-md bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px] ${
                !editMode && "hidden"
              }`}
              onClick={() => {
                isCreate ? navigate(-1) : setEditMode(!editMode);
              }}
              disabled={loading}
            >
              <FontAwesomeIcon icon={faCancel} />
              Cancel
            </button>
            <button
              className={`btn btn-sm lg:btn-md bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px] ${
                !editMode && "hidden"
              }`}
              onClick={() => handleOnSubmit()}
              disabled={loading}
            >
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <FontAwesomeIcon icon={faSave} />
              )}
              Save
            </button>
          </div>
        </div>

        <div className="my-5">
          <Section title={"BASE PRODUCT"}>
            <div>
              <div className="label">
                <span className="label-text">Type</span>
              </div>
              <select
                className="w-full select select-bordered"
                name="type"
                disabled={loading || !editMode}
                onChange={(e) => handleChangeBaseGame(e.target.value)}
                value={baseGame?.code ?? ""}
              >
                <option value={""} disabled>
                  -- Select Type --
                </option>
                {listBaseGame?.map((data) => (
                  <option
                    key={data?.code + data?.name}
                    value={data.code}
                    disabled={data?.status === "INACTIVE"}
                  >
                    {data?.status === "INACTIVE"
                      ? `${data.name} (Inactive)`
                      : data.name}
                  </option>
                ))}
              </select>
            </div>
          </Section>
        </div>

        {baseGameSelected ? (
          <>
            <div className="my-5">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <Section title={"GAME IMAGE"}>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-2">
                      <span className="label-text">Game Image</span>
                      <InputFile
                        editMode={editMode}
                        handleChangeImage={changeImage}
                        image={images?.image ?? ""}
                        name={"image"}
                        className={
                          "max-w-[123.5px] min-h-[162.5px] lg:max-w-[190px] lg:min-h-[250px]"
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <span className="label-text">Item Image</span>
                      <InputFile
                        editMode={editMode}
                        handleChangeImage={changeImage}
                        image={images?.item_image ?? ""}
                        name={"item_image"}
                        className={"max-w-[100px] min-h-[100px]"}
                      />
                    </div>
                  </div>
                </Section>
                <div className="lg:col-span-2">
                  <GameInformationField
                    payload={payload}
                    setPayload={setPayload}
                    editMode={editMode}
                  />
                </div>
              </div>
              <div className="my-5">
                <Section title={"FIELDS"} additional={additionalGameList}>
                  {payload?.fields?.map((val, i) => (
                    <GameCustomField
                      key={"customfield" + i}
                      payload={payload}
                      setPayload={setPayload}
                      editMode={editMode}
                      index={i}
                      paylaodOnIndex={val ?? {}}
                    />
                  ))}
                </Section>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </form>
    </>
  );
}
