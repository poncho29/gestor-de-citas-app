import { Roles } from "@/interfaces";

export const getRole = (role: Roles) => {
  switch (role) {
    case Roles.SUPER_ADMIN:
      return "Super Admin";
    case Roles.ADMIN:
      return "Admin";
    case Roles.SUB_ADMIN:
      return "Sub Admin";
    case Roles.CLIENT:
      return "Client";
    default:
      return "";
  }
}