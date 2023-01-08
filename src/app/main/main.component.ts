import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {PopupService} from "@ng-bootstrap/ng-bootstrap/util/popup";
import {main} from "@popperjs/core";
import {AccountComponent} from "../account/account.component";
import {AddComponent} from "../add/add.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private dialogRef: MatDialog) {}

  openDialog() {
    this.dialogRef.open(AddComponent)
  }



}


