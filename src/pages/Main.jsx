import Header from "../components/header/Header";
import ShopItems from "../components/shops_items/ShopItems";
import ShopsList from "../components/shops_list/ShopsList";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../Server";

function Main() {
  const [active, setActive] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getItems() {
      if (active == null) {
        setItems([]);
        return;
      }
      setIsLoading(true);
      const response = await fetch(baseUrl + "shopitem?shop=" + (active ?? ""));
      setItems(await response.json());
      setIsLoading(false);
    }

    getItems();
  }, [active]);

  return (
    <div>
      <Header />
      <div className="flex flex-row w-full min-h-full">
        <ShopsList active={active} setActive={setActive} />
        {isLoading ? (
          <div className="basis9/12 w-full">Loading...</div>
        ) : (
          <ShopItems items={items} setItems={setItems} />
        )}
      </div>
    </div>
  );
}

export default Main;
