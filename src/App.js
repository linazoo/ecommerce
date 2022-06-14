import * as React from "react";

//backend stuff
import { commerce } from "./lib/commerce";

import { Products, Navbar } from "./components";

const App = () => {
  const [products, setProducts] = React.useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  // console.log(products);

  return (
    <div>
      <Navbar />
      {products.length ? <Products products={products} /> : null}
    </div>
  );
};

export default App;
