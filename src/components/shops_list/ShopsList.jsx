import React, { useEffect, useState, useContext } from "react";
import { baseUrl } from "../../Server";
import Shop from "../../ui/shops_list/Shop";
import PageContext from "../../PageContext";

function ShopsList({ active, setActive }) {
  const [cart] = useContext(PageContext);
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function getShops() {
      setIsLoading(true);
      const response = await fetch(baseUrl + "shops");
      setShops(await response.json());
      setIsLoading(false);
    }

    getShops();
  }, []);

  useEffect(() => {
    if (shops.length > 0) {
      setActive(shops[0]["_id"]);
    }
  }, [shops]);

  if (isLoading) {
    return (
      <div className="basis-3/12 flex flex-col items-center">Loading...</div>
    );
  }

  return (
    <div className="basis-3/12 flex flex-col items-center">
      <div className="text-2xl mt-2 mb-8">Shops</div>
      <div className="grid gris-col gap-2 items-center">
        {shops.map((e) => (
          <Shop
            id={e["_id"]}
            title={e["name"]}
            key={e["_id"]}
            active={e["_id"] === active}
            onClick={setActive}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopsList;
