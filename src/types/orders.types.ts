export type TOrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type TPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface TOrderItem {
  productId: string;
  name: string;
  image: string;
  variant: string; // e.g. "Medium / Gold"
  price: number;
  quantity: number;
}

export interface TOrder {
  _id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: TOrderItem[];
  totalItems: number;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: TPaymentStatus;
  orderStatus: TOrderStatus;
  createdAt: string;
  shippingCity: string;
  shippingState: string;
}

export interface TOrdersKPI {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  pendingOrders: number;
  deliveredThisMonth: number;
  revenueChange: number; // % vs last month
}