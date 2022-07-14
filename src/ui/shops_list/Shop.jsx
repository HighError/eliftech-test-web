import React from "react";

function Shop({ id, active, title, onClick }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`py-3 px-8 ${
        active ? "bg-purple-900" : "bg-purple-600"
      } hover:bg-purple-900 duration-150 rounded-lg`}
    >
      {title ?? "No Name"}
    </button>
  );
}

export default Shop;
