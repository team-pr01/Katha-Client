/* eslint-disable @typescript-eslint/no-explicit-any */
// types/razorpay.d.ts
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  callback_url?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    userId?: string;
  };
  theme?: {
    color?: string;
    hideTopbar?: boolean;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
  };
  handler?: (response: any) => void;
}

export interface RazorpayInstance {
  open: () => void;
  close: () => void;
  on: (event: string, callback: (response: any) => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

// Initialize function
export const initRazorpay = (options: RazorpayOptions): RazorpayInstance => {
  if (typeof window === 'undefined' || !window.Razorpay) {
    throw new Error('Razorpay SDK is not loaded');
  }
  return new window.Razorpay(options);
};