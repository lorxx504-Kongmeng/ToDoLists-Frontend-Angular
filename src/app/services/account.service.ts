import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "../interfaces/IAccount";
import {BehaviorSubject, first} from "rxjs";
import {ICurrentAccount} from "../interfaces/ICurrentAccount";
import {enumError} from "../enums/EnumError";
import {IAddTask} from "../interfaces/IAddTask";
import {IAddSocialMedia} from "../interfaces/IAddSocialMedia";
import {IDisplayTasks} from "../interfaces/IDisplayTasks";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpService: HttpService) {}
  $current_Account = new BehaviorSubject<ICurrentAccount | null>(null);
  $error = new BehaviorSubject<string>("");
  $login = new BehaviorSubject<boolean>(false);
  $create = new BehaviorSubject<boolean>(false);
  $tasks = new BehaviorSubject<IAddTask[] | null>(null);
  $socialMedia = new BehaviorSubject<IAddSocialMedia[] | null>( null);
  $current_Id = new BehaviorSubject<number>(-1);
  $display_Tasks = new BehaviorSubject<IDisplayTasks[] | null>(null);

  public create(data: IAccount) {
    this.httpService.create(data).pipe(first()).subscribe({
      next: value => {
        console.log("successful")
        this.$create.next(false);
        this.$error.next("");
      }, error: err => {
        if (err.status === 400) {
          this.$error.next(enumError.EMPTY_ERROR);
          return;
        }
        if (err.status === 500) {
          this.$error.next(enumError.SAME_EMAIL_ERROR);
          return;
        }
      }
    });
  }
  public login(email: string, password: string) {
    this.httpService.login(email, password).pipe(first()).subscribe({
      next: value => {
        this.$current_Account.next(value);
        this.$current_Id.next(value.id);
        this.$tasks.next(value.toDoLists)
        this.getDisplayTasks();
        this.$login.next(true);
        this.$error.next("");
      }, error: err => {
        if (err.status === 400) {
          this.$error.next(enumError.LOGIN_EMPTY_ERROR);
          return;
        }
        if (err.status === 404) {
          this.$error.next(enumError.LOGIN_ACCOUNT_ERROR);
          return;
        }
      }
    })
  }
  public getDisplayTasks() {
    let temp: IAddTask[] = [];
    this.$tasks.subscribe({
      next: value => {
        if (value!=null)
        temp = value;
      }
    });
    let stuff: IDisplayTasks[] = [];
    for (let i = 0; i < temp.length; i++) {
      const date_convert = new Date(temp[i].date);
      const data: IDisplayTasks = {
        id: temp[i].id,
        title: temp[i].title,
        description: temp[i].description,
        date: date_convert
      }
      stuff.push(data);
    }
    this.$display_Tasks.next(stuff);
  }
  public addTask(data: IAddTask) {
    this.httpService.addTask(data).pipe(first()).subscribe({
      next: value => {
        this.$tasks.next(value)
        this.getDisplayTasks();
      }, error: err => {console.log(err)}
    });
  }
  public addSocialMedia(data: IAddSocialMedia) {
    this.httpService.addSocialMedia(data).pipe(first()).subscribe({
      next: value => {this.$socialMedia.next(value)}, error: err => {console.log(err)}
    });
  }

}
