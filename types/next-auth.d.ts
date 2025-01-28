import type { JWT } from "next-auth/jwt";

import { Session } from "next-auth";

type UserTenantStatus = string;
type UserTenantId = number;
type UserId = number;
type UserName = string;
type UserRole = string;
type UserEmail = string;
type UserImage = string;
type UserEmailVerified = boolean;
type UserTenantEmailVerified = boolean;
type UserPhoneNumberVerified = boolean;
type UserTenantPhoneVerified = boolean;
type UserPassword = string;
type UserCreatedAt = Date;
type UserUpdatedAt = Date;

declare module "next-auth" {
  interface NextAuthRequest {
    session?: Session;
  }

  interface User {
    user_id: UserId;
    first_name: UserName;
    last_name: UserName;
    identity_number: UserName;
    date_of_birth: UserCreatedAt;
    role: UserRole;
    email: UserEmail;
    email_verified: UserEmailVerified;
    phone: UserPhoneNumber;
    phone_verified: UserPhoneNumberVerified;
    image: UserImage;
    password: UserPassword;
    created_at: UserCreatedAt;
    updated_at: UserUpdatedAt;
  }
}

interface Session {
  user: User;
}

declare module "next-auth/jwt" {
  interface JWT {
    user_id: UserId;
    first_name: UserName;
    last_name: UserName;
    identity_number: UserName;
    date_of_birth: UserCreatedAt;
    role: UserRole;
    email: UserEmail;
    email_verified: UserEmailVerified;
    phone: UserPhoneNumber;
    phone_verified: UserPhoneNumberVerified;
    image: UserImage;
    password: UserPassword;
    created_at: UserCreatedAt;
    updated_at: UserUpdatedAt;
  }
}
