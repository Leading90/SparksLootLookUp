import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private loggedIn = false;
  private token = 'U3BhcmtzOkxvb3Q=';

  constructor() {
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logOut(): void {
    this.loggedIn = false;
  }

  getToken(): string {
    if (this.loggedIn) {
      return this.token;
    }
    return null;
  }

  checkLogInStatus(token: string): boolean {
    this.loggedIn = (token === this.token);
    return this.loggedIn;
  }
}
