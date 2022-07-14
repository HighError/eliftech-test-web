import ShopItem from "../../ui/shop_item/ShopItem";

function ShopItems({ items }) {
  return (
    <div className="basis9/12 w-full justify-center grid grid-cols-3 gap-5 m-3">
      {items.map((e) => (
        <ShopItem title={e["name"]} key={e["_id"]} id={e["_id"]} />
      ))}
    </div>
  );
}

export default ShopItems;
