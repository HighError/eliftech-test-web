import { useContext } from "react";
import CartItem from "../../ui/cart_item/CartItem";
import PageContext from "../../PageContext";

function CartItems() {
  const [cart] = useContext(PageContext);
  return (
    <div className="basis-3/4 p-3 grid grid-cols-2 gap-3">
      {Object.keys(cart).map((e) => (
        <CartItem id={e} key={e} />
      ))}
    </div>
  );
}

export default CartItems;
