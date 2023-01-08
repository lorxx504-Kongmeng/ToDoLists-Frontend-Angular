import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  constructor(private dialogRef: MatDialog) {
  }
  closeDialog() {
    this.dialogRef.closeAll();
  }

}
