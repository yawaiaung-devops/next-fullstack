import { format } from "date-fns";

export const formatDate = (date: string | Date, dateFormat?: string) =>
  format(new Date(date), dateFormat ?? "dd MMM yyyy");

export const formatDateTime = (date: string | Date) =>
  formatDate(date, "dd MMM yyyy, hh:mm aa");
