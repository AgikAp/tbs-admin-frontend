import React, { useEffect, useState } from "react";
import PageHeader from "../../components/pageheader";
import { GET_GetGameList } from "../../fetchs/game";
import { errorWriter } from "../../utils/errorwriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCancel,
  faCircleDown,
  faCircleUp,
  faEdit,
  faSave,
  faSearch,
  faSpinner,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import ItemActions from "./itemactions";
import ItemCardExternal from "./itemcardexternal";
import { POST_UploadImage } from "../../fetchs/image";
import { GET_Items, GET_LoadVariant, POST_AssignItem } from "../../fetchs/item";
import ItemCard from "./itencard";
import { idrFormat } from "../../utils/currencyFormat";
import ItemCardSpecial from "./itencardspecial";
import InputFile from "../../components/inputfile";
import { sortArrayByName, sortArrayByPrice } from "../../utils/sort";

export default function ItemPage() {
  const [index, setIndex] = useState(null);
  const [gameSelected, setGameSelected] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const [sortBy, setSortBy] = useState("price");

  const [items, setItems] = useState([]);
  const [specialItems, setSpecialItems] = useState([]);
  const [loadingItemExternal, setLoadingItemExternal] = useState(false);
  const [externalItems, setExternalItems] = useState([]);
  const [itemSelected, setItemSelected] = useState(-1);
  const [itemSpecialSelected, setItemSpecialSelected] = useState(-1);

  const [itemNotEdit, setItemNotEdit] = useState([]);
  const [specialItemNotEdit, setSpecialItemNotEdit] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const resp = await GET_GetGameList(setLoading);
        setGames(resp);
      } catch (e) {
        errorWriter(e, setErr);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (gameSelected) {
      const fetch = async () => {
        try {
          const resp = await GET_Items(gameSelected.id, setLoading);
          setItemNotEdit(resp.items);
          setItems(resp.items);
          setSpecialItemNotEdit(resp.special_items);
          setSpecialItems(resp.special_items);
        } catch (e) {
          errorWriter(e, setErr);
        }
      };

      fetch();
    }
  }, [gameSelected]);

  const handleChangeIndex = (i, val) => {
    setIndex(i);
    setGameSelected(val);
    setEditMode(false);
    setItemNotEdit([]);
    setItems([]);
    setSpecialItemNotEdit([]);
    setSpecialItems([]);
  };

  const openModalAndActionSearch = async (isAvailable) => {
    setExternalItems([]);
    openModal("modal_search");

    try {
      const resp = await GET_LoadVariant(
        gameSelected?.id,
        isAvailable,
        setLoadingItemExternal
      );
      setExternalItems(resp);
    } catch (e) {
      errorWriter(e, setErr);
    }
  };

  const openModal = (id) => {
    document.getElementById(id).showModal();
  };

  const closeModal = (id) => {
    document.getElementById(id).close();
  };

  const changeItemName = (e, index) => {
    const tempItems = [...items];
    tempItems[index].name = e.target.value;

    setItems(tempItems);
  };

  const changeItemPriceValue = (e, index, itemIndex) => {
    const tempItems = [...items];
    tempItems[itemIndex].prices[index][e.target.name] =
      e.target.type === "number"
        ? Number.parseInt(e.target.value)
        : e.target.value;
    setItems(tempItems);
  };

  const changeItemSpecialName = (e, index) => {
    const tempItems = [...specialItems];
    tempItems[index][e.target.name] = e.target.value;

    setSpecialItems(tempItems);
  };

  const changeItemSpecialPriceValue = (e, index, itemIndex) => {
    const tempItems = [...specialItems];
    tempItems[itemIndex].prices[index][e.target.name] =
      e.target.type === "number"
        ? Number.parseInt(e.target.value)
        : e.target.value;
    setSpecialItems(tempItems);
  };

  const changeItemSpecialInstruction = (e, index) => {
    const tempItems = [...specialItems];
    tempItems[index].use_instruction = e.target.checked;

    setSpecialItems(tempItems);
  };

  const removeItemFromSpecial = (index) => {
    let tempItems = [...items];
    let tempSpecialItems = [...specialItems];

    let adder = tempSpecialItems[index];
    adder.is_special = false;
    tempItems.push(adder);
    tempSpecialItems.splice(index, 1);

    if (sortBy === "name") {
      tempItems = sortArrayByName(tempItems);
    } else {
      tempItems = sortArrayByPrice(tempItems);
    }

    setSpecialItems(tempSpecialItems);
    setItems(tempItems);
  };

  const changeImage = (e, index) => {
    const selectedFile = e.target.files[0];
    const tempImages = [...specialItems];
    tempImages[index][e.target.name] = URL.createObjectURL(selectedFile);
    tempImages[index][e.target.name + "_file"] = selectedFile;
    setSpecialItems(tempImages);
  };

  const handleOnSubmit = async () => {
    let tempSpecialItems = [];
    for (let i = 0; i < specialItems.length; i++) {
      let val = specialItems[i];

      if (val?.item_image_file) {
        try {
          val.item_image = await POST_UploadImage(
            val?.item_image_file,
            setLoading
          );
        } catch (e) {
          errorWriter(e, setErr);
          return;
        }
      }

      tempSpecialItems.push(val);
    }

    let payload = {
      items,
      special_items: tempSpecialItems,
    };

    let response = {};
    try {
      response = await POST_AssignItem(payload, gameSelected.id, setLoading);
      setItems(response.items ?? []);
      setItemNotEdit(response.items ?? []);
      setSpecialItems(response.special_items ?? []);
      setSpecialItemNotEdit(response.special_items ?? []);
    } catch (e) {
      errorWriter(e, setErr);
      return;
    }
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

      {/* MODAL  */}
      <dialog id="modal_search" className="modal">
        <div className="w-11/12 max-w-5xl modal-box">
          <div>
            <div className="block">
              <span>List Item External</span>
            </div>
            {loadingItemExternal ? (
              <div className="">
                <FontAwesomeIcon icon={faSpinner} spin /> Loading items
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 py-5 lg:grid-cols-2">
                {externalItems.map((val, i) => (
                  <ItemCardExternal
                    index={i}
                    item={val}
                    key={val.code + "modal_ekscode" + i}
                    editMode={editMode}
                    items={items}
                    setItems={setItems}
                    specialItems={specialItems}
                    setSpecialItems={setSpecialItems}
                    sortBy={sortBy}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="w-full modal-action justify-normal">
            <div
              method="dialog"
              className="flex items-center justify-between w-full"
            >
              <p className="text-[12px]">
                Press ESC key or click the button below to close
              </p>
              <button
                className="float-right btn"
                onClick={() => closeModal("modal_search")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <dialog id="modal_item" className="modal">
        <div className="w-11/12 max-w-3xl modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              onClick={() => closeModal("modal_item")}
            >
              ✕
            </button>
          </form>
          {/* Next or Provious */}
          {itemSelected !== -1 ? (
            <>
              <div className="form-control">
                <label htmlFor="" className="py-3">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full input"
                  value={items[itemSelected]?.name}
                  onChange={(e) => changeItemName(e, itemSelected)}
                />
              </div>
              <div className="text-[12px] px-5">
                <div className="py-5">
                  {items[itemSelected]?.prices?.map((val, i) => (
                    <div className="grid items-center grid-cols-2 gap-5 py-2">
                      <div>
                        <span>{val.level}</span>
                        <span className="block">{idrFormat(val.price)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="form-control">
                          <label htmlFor="">Type</label>
                          <select
                            name="type"
                            className="w-full select select-xs"
                            value={val.type}
                            onChange={(e) =>
                              changeItemPriceValue(e, i, itemSelected)
                            }
                          >
                            <option disabled>-- Select Payment Type --</option>
                            <option value={"percent"}>Percent</option>
                            <option value={"amount"}>Amount</option>
                          </select>
                        </div>
                        <div className="form-control">
                          <label htmlFor="">Margin</label>
                          <input
                            name="margin"
                            type="number"
                            placeholder="Type here"
                            className="w-full input input-xs"
                            value={val.margin}
                            onChange={(e) =>
                              changeItemPriceValue(e, i, itemSelected)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <p className="py-4">
                Press ESC key or click on ✕ button to close
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </dialog>
      <dialog id="modal_item_special" className="modal">
        <div className="w-11/12 max-w-3xl modal-box">
          <form method="dialog">
            <button
              className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
              onClick={() => closeModal("modal_item_special")}
            >
              ✕
            </button>
          </form>
          {itemSpecialSelected !== -1 ? (
            <>
              <div className="form-control">
                <label htmlFor="" className="py-3">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="w-full input"
                  name="name"
                  value={specialItems[itemSpecialSelected]?.name}
                  onChange={(e) =>
                    changeItemSpecialName(e, itemSpecialSelected)
                  }
                />
              </div>
              <div className="text-[12px] px-5">
                <div className="py-5">
                  {specialItems[itemSpecialSelected]?.prices?.map((val, i) => (
                    <div className="grid items-center grid-cols-2 gap-5 py-2">
                      <div>
                        <span>{val.level}</span>
                        <span className="block">{idrFormat(val.price)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div className="form-control">
                          <label htmlFor="">Type</label>
                          <select
                            name="type"
                            className="w-full select select-xs"
                            value={val.type}
                            onChange={(e) =>
                              changeItemSpecialPriceValue(
                                e,
                                i,
                                itemSpecialSelected
                              )
                            }
                          >
                            <option disabled>-- Select Payment Type --</option>
                            <option value={"percent"}>Percent</option>
                            <option value={"amount"}>Amount</option>
                          </select>
                        </div>
                        <div className="form-control">
                          <label htmlFor="">Margin</label>
                          <input
                            name="margin"
                            type={"number"}
                            placeholder="Type here"
                            className="w-full input input-xs"
                            value={val.margin}
                            onChange={(e) =>
                              changeItemSpecialPriceValue(
                                e,
                                i,
                                itemSpecialSelected
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="py-2">
                    <div className="form-control">
                      <label
                        className="cursor-pointer label justify-normal"
                        htmlFor=""
                      >
                        <input
                          type="checkbox"
                          className="checkbox checkbox-xs"
                          checked={
                            specialItems[itemSpecialSelected]
                              ?.use_instruction === true
                          }
                          onChange={(e) =>
                            changeItemSpecialInstruction(e, itemSpecialSelected)
                          }
                        />
                        <span className="pl-3 label-text">Use instruction</span>
                      </label>
                    </div>
                    {specialItems[itemSpecialSelected]?.use_instruction ===
                      true && (
                      <div className="form-control">
                        <textarea
                          className="textarea textarea-bordered textarea-xs"
                          name="instruction"
                          placeholder="Bio"
                          onChange={(e) =>
                            changeItemSpecialName(e, itemSpecialSelected)
                          }
                        >
                          {specialItems[itemSpecialSelected]?.instruction}
                        </textarea>
                      </div>
                    )}
                  </div>
                  <div className="py-2">
                    <span className="label-text">Item Image</span>
                    <InputFile
                      editMode={editMode}
                      name={"item_image"}
                      className={"max-w-[100px] min-h-[100px]"}
                      image={
                        specialItems[itemSpecialSelected]?.item_image ?? ""
                      }
                      handleChangeImage={(e) =>
                        changeImage(e, itemSpecialSelected)
                      }
                    />
                  </div>
                  <button
                    className={`btn btn-sm float-end bg-red-600 hover:bg-red-800 text-light-0 font-semibold px-5 lg:px-7 text-[14px]`}
                    disabled={loading}
                    onClick={() => {
                      closeModal("modal_item_special");
                      removeItemFromSpecial(itemSpecialSelected);
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleDown} />
                    Remove From Special
                  </button>
                </div>
              </div>
              <p className="py-4">
                Press ESC key or click on ✕ button to close
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </dialog>

      {/* MAIN CONTENT  */}
      <PageHeader page={"Items Page"} />
      <div className="my-5">
        <div className="">
          <div role="tablist" className="overflow-hidden tabs tabs-lifted">
            {games?.map((val, i) => (
              <a
                role="tab"
                key={val + i}
                className={`tab ${
                  index !== null && index === i
                    ? "tab-active [--tab-bg:yellow] [--tab-border-color:orange] text-primary"
                    : ""
                }`}
                onClick={() => handleChangeIndex(i, val)}
              >
                {val.name}
              </a>
            ))}
          </div>
        </div>
        <ItemActions
          editMode={editMode}
          setEditMode={setEditMode}
          gameSelected={gameSelected}
          loading={loading}
          openModalAndActionSearch={openModalAndActionSearch}
          items={items}
          setItems={setItems}
          specialItems={specialItems}
          setSpecialItems={setSpecialItems}
          sortBy={sortBy}
          setSortBy={setSortBy}
          selectedAll={selectedAll}
          setSelectedAll={setSelectedAll}
          handleOnSubmit={handleOnSubmit}
        />
        {gameSelected ? (
          <div className="w-full px-5 py-3 my-5 shadow-xl bg-dark-1 lg:py-5 lg:px-10 rounded-b-md">
            <span className="font-bold text-[18px]">List Items</span>
            <div className="flex items-center justify-between"></div>
            <div className="grid grid-cols-1 my-5 lg:grid-cols-4 gap-x-3 gap-y-3">
              {editMode
                ? items.map((val, i) => (
                    <ItemCard
                      index={i}
                      key={val.name + i + val.eks_code + "edit"}
                      item={val}
                      items={items}
                      setItems={setItems}
                      selectedAll={selectedAll}
                      onClick={() => {
                        if (editMode) {
                          openModal("modal_item");
                          setItemSelected(i);
                        }
                      }}
                      editMode={editMode}
                    />
                  ))
                : itemNotEdit.map((val, i) => (
                    <ItemCard
                      index={i}
                      key={val.name + i + val.eks_code}
                      item={val}
                      items={items}
                      setItems={setItems}
                      selectedAll={selectedAll}
                      onClick={() => {
                        if (editMode) {
                          openModal("modal_item");
                          setItemSelected(i);
                        }
                      }}
                      editMode={editMode}
                    />
                  ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {gameSelected ? (
          <div className="w-full px-5 py-3 my-5 shadow-xl bg-dark-1 lg:py-5 lg:px-10 rounded-b-md">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[18px]">List Special Items</span>
            </div>
            <div className="grid grid-cols-1 my-5 lg:grid-cols-4 gap-x-3 gap-y-3">
              {editMode
                ? specialItems.map((val, i) => (
                    <ItemCardSpecial
                      key={val.name + i + val.eks_code + "special_edit"}
                      index={i}
                      specialItem={val}
                      specialItems={specialItems}
                      setSpecialItems={setSpecialItems}
                      onClick={() => {
                        if (editMode) {
                          openModal("modal_item_special");
                          setItemSpecialSelected(i);
                        }
                      }}
                    />
                  ))
                : specialItemNotEdit.map((val, i) => (
                    <ItemCardSpecial
                      key={val.name + i + val.eks_code + "special"}
                      index={i}
                      specialItem={val}
                      specialItems={specialItems}
                      setSpecialItems={setSpecialItems}
                      onClick={() => {
                        if (editMode) {
                          openModal("modal_item_special");
                          setItemSpecialSelected(i);
                        }
                      }}
                    />
                  ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
