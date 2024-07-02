export const getProductsData = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v2/web/products`
  );

  const result = await response.json();
  return result?.payload;
};
