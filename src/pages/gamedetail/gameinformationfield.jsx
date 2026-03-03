import React, { useEffect, useState } from "react";
import Section from "../../components/sections";

export default function GameInformationField({
  payload,
  setPayload,
  editMode,
}) {
  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.checked });
  };

  return (
    <>
      <Section title={"GAME INFORMATION"}>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <label className="max-w-xs min-w-full form-control">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                className="max-w-xs min-w-full input input-bordered"
                name="name"
                value={payload?.name ?? ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label className="max-w-xs min-w-full form-control">
              <div className="label">
                <span className="label-text">Developer</span>
              </div>
              <input
                type="text"
                className="max-w-xs min-w-full input input-bordered"
                name="developer"
                value={payload?.developer ?? ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <label className="max-w-xs min-w-full form-control">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                type="text"
                className="max-w-xs min-w-full textarea textarea-bordered"
                name="description"
                value={payload?.description ?? ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </label>
            <div className="my-4 form-control w-fit">
              <div>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={payload?.status ?? ""}
                    checked={payload?.status === "active"}
                    name="status"
                    onChange={(e) => {
                      e.target.checked
                        ? (e.target.value = "active")
                        : (e.target.value = "inactive");
                      handleChange(e);
                    }}
                    disabled
                  />
                  <span className="pl-5 mr-auto label-text">Game Active</span>
                </label>
              </div>
              <div>
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    className="checkbox"
                    value={payload?.checking_nickname ?? ""}
                    checked={payload?.checking_nickname ?? false}
                    name="checking_nickname"
                    onChange={handleChangeCheckbox}
                    disabled={!editMode}
                  />
                  <span className="pl-5 label-text">Check Nickname</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
