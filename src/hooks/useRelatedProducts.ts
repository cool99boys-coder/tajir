import { useMemo } from "react";
import { useProducts } from "./useProducts";

export function useRelatedProducts(
  category: string | null,
  currentId?: string,
) {
  const productsQuery = useProducts();

  const data = useMemo(() => {
    if (!productsQuery.data) return undefined;
    return productsQuery.data
      .filter((product) => product.id !== currentId)
      .filter((product) => !category || product.category === category)
      .slice(0, 4);
  }, [category, currentId, productsQuery.data]);

  return {
    data,
    isLoading: productsQuery.isLoading,
    isFetching: productsQuery.isFetching,
    isError: productsQuery.isError,
    error: productsQuery.error,
    refetch: productsQuery.refetch,
  };
}
