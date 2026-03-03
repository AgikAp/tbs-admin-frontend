import React, { useEffect, useState } from "react";
import { idrFormat } from "../../utils/currencyFormat";

export default function ItemCard({
  index,
  item,
  items,
  setItems,
  editMode,
  onClick,
  selectedAll,
}) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(item?.selected === true);
  }, [item, selectedAll]);

  useEffect(() => {
    const tempItems = [...items];
    tempItems[index].selected = selected;
    setItems(tempItems);
  }, [selected]);

  return (
    <>
      <div className="relative">
        <input
          type="checkbox"
          className="absolute top-0 right-0 checkbox border-dark-5"
          checked={selected}
          onChange={() => setSelected(!selected)}
          disabled={!editMode}
        />
        <label
          className={`border-dashed border-[1px] border-dark-5 px-5 py-5 rounded-md block cursor-pointer ${
            selected ? "bg-slate-700" : "bg-slate-800"
          }`}
          onClick={onClick}
        >
          <span className="font-light text-[14px] capitalize">
            ({item.status})
          </span>
          <div className="font-semibold">
            <span>{item.name}</span>
          </div>
          <div className="pt-3 text-dark-6">
            <span className="text-[14px]">Pricing Detail</span>
            <div className="text-[12px] flex gap-5">
              {item.prices.map((val) => (
                <span key={item.eks_code + "pricing" + val.level}>
                  {idrFormat(val.price)} <br /> +{" "}
                  {val.type === "percent" ? val.margin + "%" : val.margin} (
                  {val.level})
                </span>
              ))}
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
