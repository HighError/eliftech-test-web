import React from "react";
import CartForm from "../components/cart_form/CartForm";
import CartItems from "../components/cart_items/CartItems";
import Header from "../components/header/Header";

function Cart() {
  return (
    <div>
      <Header />
      <div className="flex flex-row w-full min-h-full">
        <CartItems />
        <CartForm />
      </div>
    </div>
  );
}

export default Cart;
