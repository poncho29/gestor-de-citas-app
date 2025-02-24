export interface ServiceResponse {
  name: string;
  description: string;
  duration: string;
  price: string;
  user_id: string;
  enterprise: null | string;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
}

export interface SimplifiedService {
  name: string;
  description: string;
  duration: string;
  price: string;
}
