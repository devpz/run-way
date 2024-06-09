import React from "react";
import { redirect, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  OrdersList,
  ComplexPaginationContainer,
  SectionTitle,
} from "../components";
import { QueryClient } from "@tanstack/react-query";
import { Store } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  username: string;
  token: string;
}

interface Params {
  page?: string;
}

const ordersQuery = (params: Params, user: User) => {
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store: Store, queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const user = (store.getState() as RootState).userState.user as User;

    if (!user) {
      toast.warn("You must be logged in to view orders");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]) as Params;
    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const Orders: React.FC = () => {
  const { meta } = useLoaderData() as {
    meta: { pagination: { total: number } };
  };
  if (meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};

export default Orders;
