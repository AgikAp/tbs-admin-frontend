import React, { useEffect, useState } from "react";
import { idrFormat } from "../../utils/currencyFormat";
import { sortArrayByName, sortArrayByPrice } from "../../utils/sort";

export default function ItemCardExternal({
  index,
  item,
  editMode,
  items,
  setItems,
  specialItems,
  setSpecialItems,
  sortBy,
}) {
  const getItemIndex = () => {
    let itemIndex = items.findIndex((val) => val.eks_code === item.code);
    if (itemIndex === -1) {
      itemIndex = specialItems.findIndex((val) => val.eks_code === item.code);
    }

    return itemIndex;
  };

  const [selected, setSelected] = useState(
    getItemIndex() === -1 ? false : true
  );

  useEffect(() => {
    getItemIndex() === -1 ? setSelected(false) : setSelected(true);
  }, [items]);

  useEffect(() => {
    let tempItems = [];

    let isSpecial = false;
    let itemIndex = items.findIndex((val) => val.eks_code === item.code);
    if (itemIndex === -1) {
      itemIndex = specialItems.findIndex((val) => val.eks_code === item.code);
      isSpecial = itemIndex !== -1;
      isSpecial ? (tempItems = [...specialItems]) : (tempItems = [...items]);
    } else {
      tempItems = [...items];
    }

    if (selected) {
      if (itemIndex === -1) {
        tempItems.push({
          eks_code: item.code,
          name: item.name,
          status: item.status,
          selected: false,
          prices: [
            {
              level: "guest",
              type: "amount",
              margin: 0,
              price: item.price.special,
            },
            {
              level: "reseller",
              type: "amount",
              margin: 0,
              price: item.price.special,
            },
            {
              level: "special",
              type: "amount",
              margin: 0,
              price: item.price.special,
            },
          ],
        });
      } else {
        tempItems[itemIndex].eks_code = item.code;
        tempItems[itemIndex].name = item.name;
        tempItems[itemIndex].status = item.status;
        tempItems[itemIndex].selected = false;

        let guest = tempItems[itemIndex].prices.findIndex(
          (val) => val.level === "guest"
        );
        let reseller = tempItems[itemIndex].prices.findIndex(
          (val) => val.level === "reseller"
        );
        let special = tempItems[itemIndex].prices.findIndex(
          (val) => val.level === "special"
        );

        if (guest !== -1) {
          tempItems[itemIndex].prices[guest].price = item.price.value;
        } else {
          tempItems[itemIndex].prices.push({
            level: "guest",
            type: "amount",
            margin: 0,
            price: item.price.value,
          });
        }

        if (reseller !== -1) {
          tempItems[itemIndex].prices[reseller].price = item.price.value;
        } else {
          tempItems[itemIndex].prices.push({
            level: "reseller",
            type: "amount",
            margin: 0,
            price: item.price.value,
          });
        }

        if (special !== -1) {
          tempItems[itemIndex].prices[special].price = item.price.value;
        } else {
          tempItems[itemIndex].prices.push({
            level: "special",
            type: "amount",
            margin: 0,
            price: item.price.value,
          });
        }
      }

      if (sortBy === "name") {
        tempItems = sortArrayByName(tempItems);
      } else {
        tempItems = sortArrayByPrice(tempItems);
      }
    } else {
      console.log("ITEM INDEX DELETED", itemIndex);
      if (itemIndex !== -1) {
        tempItems.splice(itemIndex, 1);
      }
    }

    isSpecial ? setSpecialItems(tempItems) : setItems(tempItems);
  }, [selected]);

  return (
    <>
      <div className="relative">
        <input
          type="checkbox"
          id={`item_eks_${index}`}
          className="absolute top-0 right-0 checkbox border-dark-5"
          checked={selected}
          onChange={() => setSelected(!selected)}
          name="checking_nickname"
          disabled={!editMode}
        />
        <label
          htmlFor={`item_eks_${index}`}
          className={`border-dashed border-[1px] border-dark-5 px-5 py-5 rounded-md block ${
            selected ? "bg-slate-700" : "bg-slate-800"
          }`}
        >
          <div className="font-semibold">
            <span>{item.name}</span>
            <span className="ml-2 font-light text-[14px]">({item.status})</span>
          </div>
          <div className="pt-3 text-dark-6">
            <span className="text-[14px]">Pricing Detail</span>
            <div className="text-[12px] flex gap-5">
              <span>{idrFormat(item.price.value)} (Basic)</span>
              <span>{idrFormat(item.price.value)} (Premium)</span>
              <span>{idrFormat(item.price.value)} (Special)</span>
            </div>
          </div>
        </label>
      </div>
    </>
  );
}
