import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSave,
  faTimes,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function GameCustomField({
  payload,
  setPayload,
  editMode,
  index,
  paylaodOnIndex,
}) {
  const [isSelect, setIsSelect] = useState(false);
  const [option, setOption] = useState({});

  const handleChange = (e) => {
    const tempField = payload?.fields;
    tempField[index] = {
      ...paylaodOnIndex,
      priority: index,
      [e.target.name]: e.target.value,
    };
    setPayload({
      ...payload,
      fields: tempField,
    });
  };

  const removeField = () => {
    const tempField = payload?.fields;
    tempField.splice(index, 1);
    setPayload({
      ...payload,
      fields: tempField,
    });
  };

  const handleChangeOption = (e) => {
    setOption({ ...option, [e.target.name]: e.target.value });
  };

  const handleAddOption = () => {
    const tempOnPayload = paylaodOnIndex;
    if (!paylaodOnIndex.options) {
      paylaodOnIndex.options = [option];
    } else {
      paylaodOnIndex.options.push(option);
    }

    const tempField = payload?.fields;
    tempField[index] = { ...tempOnPayload };
    setPayload({
      ...payload,
      fields: tempField,
    });
    setOption({});
  };

  const handleRemoveOption = (i) => {
    const tempOnPayload = paylaodOnIndex;
    tempOnPayload.options.splice(i, 1);

    const tempField = payload?.fields;
    tempField[index] = { ...tempOnPayload };
    setPayload({
      ...payload,
      fields: tempField,
    });
  };

  useEffect(() => {
    paylaodOnIndex?.type === "select" ? setIsSelect(true) : setIsSelect(false);
  }, [paylaodOnIndex]);

  return (
    <>
      <div className="flex py-5 my-6 border-b-2 border-b-dark-3">
        <span className="text-[34px] mr-10 mt-7 hidden lg:block">
          {index + 1}
        </span>
        <div className="relative w-full">
          <div
            className={`absolute right-0 lg:left-0 mr-2 -mt-3 lg:-mr-10 lg:-mt-4 cursor-pointer text-dark-4 hover:text-dark-6 ${
              !editMode && "hidden"
            }`}
            onClick={() => removeField()}
          >
            Remove Field {index + 1} <FontAwesomeIcon icon={faTimesCircle} />
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-6">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                className="input input-bordered"
                name="field"
                value={paylaodOnIndex?.field ?? ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Placeholder</span>
              </div>
              <input
                type="text"
                className="input input-bordered"
                name="placeholder"
                value={paylaodOnIndex?.placeholder ?? ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input
                type="text"
                className="input input-bordered"
                name="description"
                value={paylaodOnIndex?.description ?? ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Type</span>
              </div>
              <select
                className="select select-bordered"
                name="type"
                value={paylaodOnIndex?.type ?? ""}
                onChange={handleChange}
                disabled
              >
                <option value={""} disabled>
                  -- Select Type --
                </option>
                <option value={"text"}>Text</option>
                <option value={"number"}>Number</option>
                <option value={"select"}>Select</option>
              </select>
            </label>
            {isSelect && (
              <div className="lg:col-span-2">
                <div className="grid items-end grid-cols-1 gap-3 lg:grid-cols-3">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Enter display</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered"
                      name="label"
                      value={option?.label ?? ""}
                      onChange={handleChangeOption}
                      disabled
                    />
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text">Enter value</span>
                    </div>
                    <input
                      type="text"
                      className="input input-bordered"
                      name="value"
                      value={option?.value ?? ""}
                      onChange={handleChangeOption}
                      disabled
                    />
                  </label>
                  <label className="form-control">
                    <button
                      className="btn bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]"
                      onClick={handleAddOption}
                      disabled
                    >
                      <FontAwesomeIcon icon={faPlus} disabled={!editMode} />
                      Add Options
                    </button>
                  </label>
                </div>
                <div className="flex flex-wrap gap-2 py-5">
                  {paylaodOnIndex?.options?.map((val, i) => (
                    <div
                      key={val + i}
                      className="flex items-center gap-2 px-3 py-3 badge badge-primary badge-outline"
                    >
                      {val.label} : {val.value}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
