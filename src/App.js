import * as React from "react";

//backend stuff
import { commerce } from "./lib/commerce";

import { Products, Navbar } from "./components";

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <div>
      <Navbar totalItems={cart.total_items} />
      {products.length ? (
        <Products products={products} onAddToCart={handleAddToCart} />
      ) : null}
    </div>
  );
};

export default App;
