import type { User } from "./User.type";

export interface RegisterResponse {
  qrCodeUrl: string;
  user: User;
}
