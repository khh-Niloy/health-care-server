export interface ICreatePatient {
  name: string;
  email: string;
  password: string;
  address?: string;
  profilePhoto?: string;
  updatedAt?: Date;
}

export enum ERole {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  ADMIN = "ADMIN",
}

export enum EUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}
