import React, { useContext } from "react";
import PageContext from "../../PageContext";

function ShopItem({ id, title }) {
  const [cart, setCart] = useContext(PageContext);

  function addToCart() {
    setCart({ ...cart, [id]: 1 });
  }

  function removeFromCart() {
    const copy = { ...cart };
    delete copy[id];
    setCart({ ...copy });
  }

  return (
    <div className="border rounded-xl p-8 border-white/50 flex flex-col">
      <img
        className="self-center border rounded-lg"
        src="https://picsum.photos/225/150"
        alt=""
      />
      <div className="flex flex-row justify-between mt-5">
        <div className="text-xl flex flex-wrap">{title ?? "No Name"}</div>
        <button
          className="bg-purple-700 px-4 py-1 rounded-lg hover:bg-purple-900 duration-150"
          onClick={id in cart ? removeFromCart : addToCart}
        >
          {id in cart ? "Remove from cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ShopItem;
