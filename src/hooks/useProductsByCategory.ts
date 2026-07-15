import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../api/products";

export function useProductsByCategory(category: string) {
  const query = useQuery({
    queryKey: ["category", category],
    queryFn: () => getProductsByCategory(category),
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
