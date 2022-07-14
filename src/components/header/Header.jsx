import React from "react";
import HeaderButton from "../../ui/header/HeaderButton";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  function goToMain() {
    navigate("/");
  }
  function goToCart() {
    navigate("/cart");
  }
  return (
    <div className="flex flex-row gap-4 px-4 w-full h-16 items-center bg-gray-800">
      <HeaderButton title="Shop" goTo={goToMain} />
      <HeaderButton title="Shopping Cart" goTo={goToCart} />
    </div>
  );
}

export default Header;
