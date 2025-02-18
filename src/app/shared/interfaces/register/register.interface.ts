export interface IRegister{
  firstName:string;
  lastName:string;
  email:string;
  phoneNumber:string;
  password:string;
  confirmationPassword: string;
}
export interface IRegisterResponse extends IRegister{
  id:number | string;
}
