export interface Transaction {
    id:string;
  amount: number;
  user_name: string;
  payment_date: string;
  is_paid: boolean;
}

export interface ProviderDetails {
  user_name: string;
  email: string;
  address: string;
  phone_no: string;
  image: string;
  resturent_name: string;
  certificate:string;
}
export interface ProviderMenu {
  food_name: string;
  price: number;
  menu_name: string;
  category_name: string;
  image: string;
}

export interface Provider {
  id: string;
  email: string;
  user_name: string;
  verification_status: string;
  is_blocked: boolean;
}