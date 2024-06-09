import React from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
  [key: string]: any;
}

const ErrorElement: React.FC = () => {
  const error = useRouteError() as RouteError;
  console.log(error);

  return <h4 className="font-bold text-4xl">There was an error...</h4>;
};

export default ErrorElement;
