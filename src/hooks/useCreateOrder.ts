import { useMutation } from "@tanstack/react-query";
import {
  createOrder,
  createOrderItems,
  uploadOrderScreenshot,
} from "../api/orders";
import type {
  CreateOrderInput,
  CreateOrderItemInput,
  Order,
} from "../types/order";

export interface CreateOrderVariables {
  order: CreateOrderInput;
  items: CreateOrderItemInput[];
  screenshotFile: File | null;
}

export function useCreateOrder() {
  const mutation = useMutation<Order, Error, CreateOrderVariables>({
    mutationFn: async ({ order, items, screenshotFile }) => {
      let screenshotUrl = order.screenshot_url;

      if (screenshotFile) {
        screenshotUrl = await uploadOrderScreenshot(
          screenshotFile,
          order.order_code,
        );
      }

      const createdOrder = await createOrder({
        ...order,
        screenshot_url: screenshotUrl,
      });

      await createOrderItems(
        items.map((item) => ({
          ...item,
          order_id: createdOrder.id,
        })),
      );

      return createdOrder;
    },
  });

  return {
    data: mutation.data,
    isLoading: mutation.isPending,
    isFetching: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    refetch: mutation.mutateAsync,
    reset: mutation.reset,
  };
}
