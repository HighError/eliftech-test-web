import React, { useContext, useEffect, useState } from "react";
import PageContext from "../../PageContext";
import { baseUrl } from "../../Server";

function CartItem({ id }) {
  const [cart, setCart] = useContext(PageContext);

  const [data, setData] = useState({});
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getItem() {
      setIsLoading(true);
      const response = await fetch(baseUrl + "shopitem?id=" + id);
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    }

    getItem();
    setAmount(cart[id]);
  }, []);

  useEffect(() => {
    if (amount <= 0) {
      const copy = { ...cart };
      delete copy[id];
      setCart({ ...copy });
      return;
    }
    setCart({ ...cart, [id]: amount });
  }, [amount]);

  return (
    <div className="border rounded-xl p-3 flex flex-row justify-between max-h-48">
      <img
        className="self-center border rounded-lg"
        src="https://picsum.photos/225/150"
        alt=""
      />
      <div className="flex flex-col items-center justify-between">
        <div className="text-xl">{isLoading ? "Loading..." : data["name"]}</div>
        <div>Price: {isLoading ? "Loading..." : `${data["price"]}$`}</div>
        <input
          className="text-black py-1 px-3 rounded-lg"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={0}
        ></input>
      </div>
    </div>
  );
}

export default CartItem;
