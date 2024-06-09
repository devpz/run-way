import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItemsList, SectionTitle, CartTotals } from "../components";
import { RootState } from "../store";

const Cart: React.FC = () => {
  const user = useSelector((state: RootState) => state.userState.user);
  const numItemsInCart = useSelector(
    (state: RootState) => state.cartState.numItemsInCart
  );

  if (numItemsInCart === 0) {
    return <h2 className="text-2xl font-bold">Your cart is empty</h2>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold">Shopping cart</h2>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {user ? (
            <Link to="/checkout" className="btn btn-primary btn-block mt-8">
              proceed to checkout
            </Link>
          ) : (
            <Link to="/login" className="btn btn-primary btn-block mt-8">
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
