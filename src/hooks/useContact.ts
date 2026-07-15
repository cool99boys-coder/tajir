import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getContact } from "../api/contact";

export function useContact() {
  const query = useQuery({
    queryKey: ["contact"],
    queryFn: getContact,
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
