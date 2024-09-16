import type { IOrder } from "@/entities/Iorder";
import { httpClient } from "./httpClient";


export class OrderServices {
  static async getOrders() {
    const { data } = await httpClient.get<{ orders: IOrder[] }>('/orders');
    return data.orders;
  }
}
