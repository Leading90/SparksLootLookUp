import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LogInDialogComponent} from './components/log-in-dialog/log-in-dialog.component';
import {LogInService} from './services/log-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sparks-loot-look-up-app';
  selectedItem: string;

  constructor(public dialog: MatDialog, private logInService: LogInService) {
  }

  get loggedIn(): boolean {
    return this.logInService.isLoggedIn();
  }

  openLogInDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(LogInDialogComponent, dialogConfig);
  }

  logOut(): void {
    this.logInService.logOut();
  }
}
