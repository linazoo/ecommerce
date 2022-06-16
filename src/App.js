import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//backend stuff
import { commerce } from "./lib/commerce";

import { Products, Navbar, Cart, Checkout } from "./components";

const App = () => {
  const [products, setProducts] = React.useState([]);
  const [cart, setCart] = React.useState({});
  const [order, setOrder] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  React.useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log({ cart });

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            {products.length ? (
              <Products products={products} onAddToCart={handleAddToCart} />
            ) : null}
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              onUpdateCartQty={handleUpdateCartQty}
              // handleAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
              onEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
