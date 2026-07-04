export interface Member {
  id: string;
  name: string;
  role?: string;
  linkedln?:string;
} 
export interface ContactData {
  name: string;
  email: string;
  message:string;
} 

export interface ContactsList  {
  icon: React.ElementType;
  title: string;
  url: string;
};