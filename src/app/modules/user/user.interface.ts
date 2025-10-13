export interface ICreatePatient {
    name: string;
    email: string;
    password: string;
    address?: string;
    profilePhoto?: string;
    updatedAt?: Date
}
