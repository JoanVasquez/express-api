export default interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
}
