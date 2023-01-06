import {ISocialMedia} from "./ISocialMedia";
import {IToDoLists} from "./IToDoLists";

export interface ICurrentAccount {
  fName: string;
  lName: string;
  email: string;
  password: string;
  bDate: number;
  image: string;
  socialMedia: ISocialMedia[];
  toDoLists: IToDoLists[];
}
