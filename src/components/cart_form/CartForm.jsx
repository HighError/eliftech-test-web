import PageContext from "../../PageContext";
import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../../Server";

function CartForm() {
  const [cart, setCart] = useContext(PageContext);
  const [sum, setSum] = useState(0.0);
  const [error, setError] = useState(null);
  const [successfully, setSuccessfully] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [activeButton, setActiveButton] = useState(true);

  useEffect(() => {
    async function getPrice(id) {
      const response = await fetch(baseUrl + "shopitem?id=" + id);
      const data = await response.json();
      return Number(data["price"]);
    }

    async function calculate() {
      let price = 0;
      for (let key in cart) {
        price += (await getPrice(key)) * cart[key];
      }
      setSum(price.toFixed(2));
    }

    calculate();
  }, [cart]);

  async function submit(e) {
    e.preventDefault();
    setActiveButton(false);
    setError(null);
    setSuccessfully(false);

    if (
      data.name === "" ||
      data.email === "" ||
      data.phone === "" ||
      data.address === "" ||
      cart === {}
    ) {
      setError("All fields must be filled");
      setActiveButton(true);
      return;
    }

    await fetch(baseUrl + "order", {
      method: "POST",
      body: JSON.stringify({ ...data, price: sum, cart: cart }),
    })
      .then((r) => {
        setSuccessfully(true);
        setTimeout((e) => {
          setCart({});
          window.location.reload(false);
        }, 1500);
        return;
      })
      .catch((error) => {
        setError("Error request to db");
        setActiveButton(true);
      });
  }

  function changeData(e, key) {
    setData({ ...data, [key]: e.target.value });
  }

  return (
    <form
      className="flex flex-col gap-y-4 basis-1/4 py-2 px-6 items-center"
      id="order"
      onSubmit={submit}
    >
      <div>
        <div className="mb-1">Name</div>
        <input
          className={buttonStyle}
          placeholder="Enter your name"
          onChange={(e) => changeData(e, "name")}
          value={data["name"]}
        />
      </div>
      <div>
        <div>Email</div>
        <input
          className={buttonStyle}
          placeholder="Enter your email"
          type="email"
          onChange={(e) => changeData(e, "email")}
          value={data["email"]}
        />
      </div>
      <div>
        <div className="mb-1">Phone</div>
        <input
          className={buttonStyle}
          placeholder="Enter your phone"
          type="phone"
          onChange={(e) => changeData(e, "phone")}
          value={data["phone"]}
        />
      </div>
      <div>
        <div className="mb-1">Address</div>
        <input
          className={buttonStyle}
          placeholder="Enter your address"
          onChange={(e) => changeData(e, "address")}
          value={data["address"]}
        />
      </div>
      {error ? <div className="text-red-600">{error}</div> : <></>}
      {successfully ? (
        <div className="text-green-600">Order saved successfully</div>
      ) : (
        <></>
      )}
      <div className="text-xl font-bold">Price: {sum ?? 0}$</div>
      <button
        className="bg-purple-700 hover:bg-purple-900 duration-150 px-8 py-3 rounded-xl"
        disabled={!activeButton}
      >
        Submit
      </button>
    </form>
  );
}

const buttonStyle = "rounded-lg text-black py-1 px-3";

export default CartForm;
