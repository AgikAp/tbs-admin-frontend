import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function ItemActionSearchItem({
  editMode,
  setEditMode,
  loading,
  openModalAndActionSearch,
}) {
  const [param, setParam] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const sendParamAndOpenModal = () => {
    openModalAndActionSearch(isAvailable);
  };

  return (
    <form
      className="border-dashed border-[1px] border-dark-3 rounded-md px-5 py-3 h-fit"
      onSubmit={(e) => e.preventDefault()}
    >
      <span>Search Item</span>
      <div></div>
      <div className="grid grid-cols-1 gap-3">
        <label className="max-w-xs min-w-full form-control">
          <div className="label">
            <span className="label-text text-dark-4">Keyword</span>
          </div>
          <input
            type="text"
            className="max-w-xs min-w-full input input-bordered input-sm"
            name="search-item"
            value={param}
            onChange={(e) => setParam(e.target.value)}
            disabled={!editMode}
          />
        </label>
      </div>
      <div className="border-t-[1px] border-dark-3 mt-5 pt-5 items-center flex justify-between">
        <label className="cursor-pointer label justify-normal">
          <input
            type="checkbox"
            className="checkbox"
            name="is_available_item"
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
          />
          <span className="pl-5 label-text">Available Items</span>
        </label>
        <button
          type="submit"
          className={`btn btn-sm float-end bg-primary-2 hover:bg-primary-1 text-light-0 font-semibold px-5 lg:px-7 text-[14px]`}
          onClick={sendParamAndOpenModal}
          disabled={loading}
        >
          <FontAwesomeIcon icon={faSearch} />
          Search Items
        </button>
      </div>
    </form>
  );
}
