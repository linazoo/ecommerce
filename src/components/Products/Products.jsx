import React from "react";
import { Grid } from "@material-ui/core";

import Product from "./Product/Product";
import useStyles from "./styles";

const products = [
  {
    id: 1,
    name: "nike shoes 1",
    description: "running shoes",
    price: "$5000",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/afd1c6cf-9453-405d-9c24-e09cb06f45d1/air-force-1-fontanka-womens-shoes-cWbdwn.png",
  },
  {
    id: 2,
    name: "nike shoes",
    description: "running shoes 2",
    price: "$1000",
    image:
      "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/41ac131c-9f5a-448b-a6d7-a64dc6444766/air-force-1-fontanka-womens-shoes-cWbdwn.png",
  },
];
const Products = () => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <Grid container justifyContent="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
