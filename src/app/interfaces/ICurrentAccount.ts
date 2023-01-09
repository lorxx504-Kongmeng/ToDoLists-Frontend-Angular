import {ISocialMedia} from "./ISocialMedia";
import {IToDoLists} from "./IToDoLists";
import {IAddTask} from "./IAddTask";

export interface ICurrentAccount {
  id: number;
  fName: string;
  lName: string;
  email: string;
  bDate: number;
  image: string;
  socialMedia: ISocialMedia[];
  toDoLists: IAddTask[];
}
