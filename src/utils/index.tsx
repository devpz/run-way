import axios from "axios";

const productionUrl = "https://run-way.onrender.com/api/";

export const customFetch = axios.create({
  baseURL: productionUrl,
});

export const formatPrice = (price: number): string => {
  const dollarsAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarsAmount;
};

export const generateAmountOptions = (number: number): JSX.Element[] => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
export const generateShoeSizeOptions = (
  minSize: number,
  maxSize: number
): JSX.Element[] => {
  return Array.from({ length: maxSize - minSize + 1 }, (_, index) => {
    const size = minSize + index;
    return (
      <option key={size} value={size}>
        {size}
      </option>
    );
  });
};
