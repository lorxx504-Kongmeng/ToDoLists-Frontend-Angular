import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "../interfaces/IAccount";
import {BehaviorSubject, first} from "rxjs";
import {ICurrentAccount} from "../interfaces/ICurrentAccount";
import {enumError} from "../enums/EnumError";
import {IAddTask} from "../interfaces/IAddTask";
import {IAddSocialMedia} from "../interfaces/IAddSocialMedia";

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

  public addTask(data: IAddTask) {
    this.httpService.addTask(data).pipe(first()).subscribe({
      next: value => {this.$tasks.next(value)}, error: err => {console.log(err)}
    });
  }
  public addSocialMedia(data: IAddSocialMedia) {
    this.httpService.addSocialMedia(data).pipe(first()).subscribe({
      next: value => {this.$socialMedia.next(value)}, error: err => {console.log(err)}
    });
  }

}
