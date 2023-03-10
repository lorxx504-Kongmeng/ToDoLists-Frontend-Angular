import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {AddComponent} from "../add/add.component";
import {AccountService} from "../services/account.service";
import {IAddTask} from "../interfaces/IAddTask";
import {Subscription} from "rxjs";
import {ICurrentAccount} from "../interfaces/ICurrentAccount";
import {ViewComponent} from "../view/view.component";
import {IDisplayTasks} from "../interfaces/IDisplayTasks";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnDestroy{
  constructor(private dialogRef: MatDialog, private accountService: AccountService) {
    this.sub1 = this.accountService.$current_Account.subscribe({
      next: value => {
        if (value!=null) {
          this.current_Account = value;
        }
      }
    })
    this.sub2 = this.accountService.$tasks.subscribe({
        next: value => {
          if(value != null) {
            this.tasks = value
          }
        }, error: err =>  {console.log(err)}});
      this.sub2 = this.accountService.$current_Account.subscribe({
        next: value => {
          if (value!=null) {
            this.current_Account = value;
          }
        }
      });
      this.sub3 = this.accountService.$display_Tasks.subscribe({
        next: value => {
          if (value!= null)
          this.displayTasks = value}
      });
      setInterval(() => {
        this.date = new Date()
      }, 1000)
  }

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  tasks: IAddTask[] = [];
  displayTasks: IDisplayTasks[] = [];
  current_Account: ICurrentAccount = {
    id: -1,
    fName: "",
    lName: "",
    email: "",
    bDate: -1,
    image: "",
    socialMedia: [],
    toDoLists: []
  }

  date: Date = new Date();

  openDialog() {
    this.dialogRef.open(AddComponent)
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  moreDetail(i: number) {
    this.dialogRef.open(ViewComponent,{
      data: i
    });
  }


}


