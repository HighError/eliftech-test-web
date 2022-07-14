import React from "react";

function HeaderButton({ title, goTo }) {
  return (
    <button
      className="bg-purple-700 py-1 px-4 rounded-xl hover:bg-purple-900 duration-150"
      onClick={goTo}
    >
      {title}
    </button>
  );
}

export default HeaderButton;
