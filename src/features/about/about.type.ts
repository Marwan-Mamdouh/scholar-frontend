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

export interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
};

export interface TimelineItem {
  id: string;
  idColor: string;
  title: string;
  description: string;
};