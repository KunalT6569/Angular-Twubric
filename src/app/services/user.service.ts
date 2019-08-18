import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../types/app.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];
  constructor (private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(
        'https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/9667fc19a0f89193e894da7aaadf6a4b7758b45e/twubric.json'
      )
      .pipe(
        tap((users: User[]) => (this.users = users))
      );
  }

  removeUser(user: User): Observable<void> {
    // replicate an API request
    return of(null)
      .pipe(
        tap(() => {
          const index = this.users.findIndex(u => u.uid === user.uid);
          this.users.splice(index, 1);
        })
      )
  }
}
