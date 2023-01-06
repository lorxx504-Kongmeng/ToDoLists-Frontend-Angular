import {Component, OnDestroy} from '@angular/core';
import {AccountService} from "./services/account.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  constructor(private accountService: AccountService) {
    this.sub1 = this.accountService.$login.subscribe({
      next: value => {this.login = value}
    });
  }
  sub1: Subscription;
  login: boolean = false;
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
}
