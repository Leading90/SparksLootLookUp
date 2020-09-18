import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LogInService} from '../../services/log-in.service';

export interface DialogData {
  userName: string;
  password: string;
}


@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.css']
})
export class LogInDialogComponent implements OnInit {
  form: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private logInService: LogInService,
    public dialogRef: MatDialogRef<LogInDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', []],
      password: ['', []],
    });
  }

  save(): void {
    const isLoggedIn = this.logInService.checkLogInStatus(btoa(this.form.get('userName').value + ':' + this.form.get('password').value));
    if (isLoggedIn) {
      this.dialogRef.close(this.form);
      this.message = null;
    } else {
      this.message = 'Wrong Password';
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
