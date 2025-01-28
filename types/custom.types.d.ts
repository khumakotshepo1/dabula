declare interface PointsPropType {
  point_id: number;
  user_id: number;
  paid_amount: number;
  points_earned: number;
  created_at: string;
  added_by: number;
}

declare interface QuartPropType {
  quart_id: number;
  user_id: number;
  redeemed: boolean;
  created_at: string;
}

declare interface RedemptionPropType {
  redemption_id: number;
  user_id: number;
  quart_id: number;
  redemption_date: string;
}

declare interface CustomerPropType {
  user_id: number;
  first_name: string;
  last_name: string;
  identity_number: string;
  date_of_birth: string;
  phone: string;
  email: string;
  email_verified: boolean;
  password: string;
  residential_address: string;
  role: string;
  image: string;
  points_earned: string;
  quarts_redeemed: string;
  redemptions: string;
  created_at: string;
  updated_at: string;
}
