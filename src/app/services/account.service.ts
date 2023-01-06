import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {IAccount} from "../interfaces/IAccount";
import {BehaviorSubject, first} from "rxjs";
import {ICurrentAccount} from "../interfaces/ICurrentAccount";
import {enumError} from "../enums/EnumError";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private httpService: HttpService) {}
  $current_Account = new BehaviorSubject<ICurrentAccount | null>(null);
  $error = new BehaviorSubject<string>("");
  $login = new BehaviorSubject<boolean>(false);
  $create = new BehaviorSubject<boolean>(false);

  public create(data: IAccount) {
    this.httpService.create(data).pipe(first()).subscribe({
      next: value => {
        console.log("successful")
        this.$create.next(false);
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
        this.$login.next(true);
      }, error: err => {
        if (err.status === 400) {
          this.$error.next(enumError.LOGIN_EMPTY_ERROR);
          return;
        }
        if (err.status === 500) {
          this.$error.next(enumError.LOGIN_ACCOUNT_ERROR);
          return;
        }
      }
    })
  }

}
