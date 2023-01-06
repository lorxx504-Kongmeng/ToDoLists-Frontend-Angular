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
  }
  sub1: Subscription;

  email: string = "";
  password: string = "";
  fName: string = "";
  lName: string = "";
  bDate: number = -1;
  image: string = "";
  create: boolean = false;

  onCreate() {
    this.accountService.$create.next(true);
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
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
