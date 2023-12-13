import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  constructor(private dialogRef: MatDialogRef<SortComponent>) {}
  sortByData(argument: any) {
    this.dialogRef.close(argument);
  }
}
