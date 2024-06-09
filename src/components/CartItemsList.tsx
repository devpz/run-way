import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { RootState } from "../store";

const CartItemsList: React.FC = () => {
  const cartItems = useSelector(
    (state: RootState) => state.cartState.cartItems
  );

  return (
    <>
      {cartItems.map((item) => (
        <CartItem key={item.cartID} cartItem={item} />
      ))}
    </>
  );
};

export default CartItemsList;
