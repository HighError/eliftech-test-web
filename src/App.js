import "./App.css";
import Main from "./pages/Main";
import { Route, Routes, useLocation } from "react-router-dom";
import Cart from "./pages/Cart";
import { useEffect, useState } from "react";
import PageContext from "./PageContext";

function App() {
  const location = useLocation();
  const [cart, setCart] = useState(() => {
    if ("cart" in localStorage) {
      return JSON.parse(localStorage.getItem("cart"));
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <PageContext.Provider value={[cart, setCart]}>
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/cart" element={<Cart />} />
      </Routes>
    </PageContext.Provider>
  );
}

export default App;
