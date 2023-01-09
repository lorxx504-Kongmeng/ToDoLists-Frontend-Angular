import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AccountService} from "../services/account.service";
import {IAddTask} from "../interfaces/IAddTask";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnDestroy{
  constructor(private dialogRef: MatDialog, private accountService: AccountService) {
    this.sub1 = this.accountService.$error.subscribe({
      next: value => {this.error = value}
    });
    this.sub2 = this.accountService.$current_Id.subscribe({
      next: value => {this.user_Id = value}
    });

  }
  sub1: Subscription;
  sub2: Subscription;
  title: string = "";
  description: string = "";
  date: number = -1;
  current_Date: string = "";
  error: string = "";
  user_Id: number = -1;

  closeDialog() {
    this.dialogRef.closeAll();
  }
  addTask() {
    const day = new Date(this.current_Date);
    const result = day.getTime();
    this.date = result;

    if (this.title === "" || this.current_Date === "") {
      this.accountService.$error.next("Please make sure the title and date are not empty.");
      return;
    }
    this.accountService.$error.next("");
    const data: IAddTask = {
      id: this.user_Id,
      date: this.date,
      title: this.title,
      description: this.description
    }
    this.accountService.addTask(data);
    this.dialogRef.closeAll();
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }


}
