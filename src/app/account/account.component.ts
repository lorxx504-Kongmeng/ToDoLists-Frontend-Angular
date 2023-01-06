import {Component, OnDestroy} from '@angular/core';
import {IAccount} from "../interfaces/IAccount";
import {AccountService} from "../services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.sub1 = this.accountService.$create.subscribe({
      next: value => {this.create = value}
    });
    this.sub2 = this.accountService.$error.subscribe({
      next: value => {this.error = value}
    })
  }
  sub1: Subscription;
  sub2: Subscription;
  error: string = "";
  email: string = "";
  password: string = "";
  fName: string = "";
  lName: string = "";
  bDate: number = -1;
  image: string = "";
  create: boolean = false;
  birthday: string = "";

  onCreate() {
    this.accountService.$create.next(true);
    this.clearString();
  }
  onCreateAccount() {
    const day = new Date(this.birthday);
    const result = day.getTime();
    this.bDate = result;
    const data: IAccount = {
      fName: this.fName,
      lName: this.lName,
      email: this.email,
      password: this.password,
      bDate: this.bDate
    }
    this.accountService.create(data);
    this.clearString();
  }
  onCancel() {
    this.accountService.$create.next(false);
    this.clearString();
  }
  onLogin() {
    this.accountService.login(this.email,this.password);
    this.clearString();
  }

  clearString() {
    this.email = "";
    this.password = "";
    this.fName = "";
    this.lName = "";
    this.bDate = -1;
    this.image = "";
    this.accountService.$error.next("");
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
