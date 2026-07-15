import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";

export function useProducts() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    placeholderData: keepPreviousData,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
