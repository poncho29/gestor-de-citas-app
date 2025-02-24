export interface ServiceResponse {
  name: string;
  description: string;
  duration: number;
  price: number;
  user_id: string;
  enterprise: null | string;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface SimplifiedService {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}
