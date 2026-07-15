import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/products";

export function useSearchProducts(search: string) {
  const term = search.trim();
  const query = useQuery({
    queryKey: ["search", term],
    queryFn: () => searchProducts(term),
    enabled: term.length > 0,
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
