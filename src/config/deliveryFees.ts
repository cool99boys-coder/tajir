export const DELIVERY_FEES = {
  ADDIS_ABABA: 0,
  OUTSIDE_ADDIS: 300,
} as const;

export type DeliveryLocation = "addis_ababa" | "outside_addis";

export const DELIVERY_OPTIONS: {
  value: DeliveryLocation;
  label: string;
  fee: number;
}[] = [
  {
    value: "addis_ababa",
    label: "Addis Ababa",
    fee: DELIVERY_FEES.ADDIS_ABABA,
  },
  {
    value: "outside_addis",
    label: "Outside Addis Ababa",
    fee: DELIVERY_FEES.OUTSIDE_ADDIS,
  },
];
