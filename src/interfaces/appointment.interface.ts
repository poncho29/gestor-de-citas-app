import { User } from "./user.interface";

export interface AppoinmentResponse {
  appointments: Appointment[];
  total:        number;
}

export interface Appointment {
  id:          string;
  date:        Date;
  start_time:  Date;
  end_time:    Date;
  customer_id: string;
  created_at:  Date;
  updated_at:  Date;
  deleted_at:  null;
  user:        User;
}