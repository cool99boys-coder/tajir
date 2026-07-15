import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/products";

export function useProduct(id?: string) {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id ?? ""),
    enabled: !!id,
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
