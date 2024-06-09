import React, { useState } from "react";
import { useLoaderData, LoaderFunctionArgs, Link } from "react-router-dom";
import {
  formatPrice,
  customFetch,
  generateAmountOptions,
  generateShoeSizeOptions,
} from "../utils";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { QueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ProductAttributes {
  image: string;
  title: string;
  price: number;
  description: string;
  colors: string[];
  company: string;
}

interface Product {
  id: string;
  attributes: ProductAttributes;
}

interface LoaderData {
  product: Product;
}

const singleProductQuery = (id: string) => {
  return {
    queryKey: ["singleProduct", id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs): Promise<{ product: Product }> => {
    const response: AxiosResponse = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );
    return { product: response.data.data };
  };

const SingleProduct: React.FC = () => {
  const { product } = useLoaderData() as LoaderData;
  const { image, title, price, description, colors, company } =
    product.attributes;
  const dollarsAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const [shoeSize, setShoeSize] = useState<number | string>("");

  const handleAmount = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const handleShoeSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShoeSize(e.target.value);
  };

  const cartProduct = {
    cartID: product.id + productColor + shoeSize,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    shoeSize,
    amount,
  };

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <img
          src={image}
          alt={title}
          className="w-106 h-66 object-cover rounded-lg lg:w-full"
        />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`badge w-6 h-6 mr-2 ${
                    color === productColor && "border-2 border-secondary"
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                ></button>
              ))}
            </div>
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={handleAmount}
            >
              {generateAmountOptions(20)}
            </select>
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label" htmlFor="shoe-size">
              <h4 className="text-md font-medium -tracking-wider capitalize">
                Shoe Size
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="shoe-size"
              value={shoeSize}
              onChange={handleShoeSizeChange}
            >
              {generateShoeSizeOptions(36, 48)}
            </select>
          </div>
          <div className="mt-10">
            <button className="btn btn-secondary btn-md" onClick={addToCart}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
