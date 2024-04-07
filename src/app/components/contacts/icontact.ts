export interface IContact {
  id: number;
  name: string;
  number: string;
  email?: string;
  birthday?: string;
  socials?: string;
  obs?: string;
  avatar?: string | ArrayBuffer;
}
