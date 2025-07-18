import type { User } from "./User.type";

export type TwoFactorRequest = {
    user: User,
    twoFactorAuthenticationCode: string;
};
