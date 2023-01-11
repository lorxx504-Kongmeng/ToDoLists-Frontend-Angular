import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AccountService} from "../services/account.service";
import {Subscription} from "rxjs";
import {IDisplayTasks} from "../interfaces/IDisplayTasks";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnDestroy{
  constructor(@Inject(MAT_DIALOG_DATA) private data: number, private accountService: AccountService) {
    this.index = data;
    this.sub1 = this.accountService.$display_Tasks.subscribe({
      next: value => {
        if (value!=null)
        this.tasks = value}
    });
    this.task = this.tasks[this.index]
  }
  tasks: IDisplayTasks[] = [];
  task: IDisplayTasks = {
    id: -1,
    date: new Date(),
    title: "",
    description: ""
  }
  sub1: Subscription;
  index: number = -1;
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
