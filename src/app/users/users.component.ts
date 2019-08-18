import { Component, OnInit } from '@angular/core';
import { User, DateFilter, SortModel } from '../types/app.types';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  filterApplied: boolean;
  dateFilter: DateFilter;
  filteredUsers: User[] = [];

  constructor (private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => (this.users = [...users]));
  }

  updateOrder(sortingData: SortModel) {
    this.users = [...this.userService.users];
    this.users.sort((a, b) => {
      const keyA = a.twubric[sortingData.key];
      const keyB = b.twubric[sortingData.key];

      switch (sortingData.order) {
        case 'asc':
          return keyA - keyB;
        case 'desc':
          return keyB - keyA;
        case 'default':
          return 1;
      }
    });
  }

  removeUser(user: User) {
    this.userService.removeUser(user).subscribe(() => {
      const index = this.users.findIndex(u => u.uid === user.uid);
      this.users.splice(index, 1);

      this.applyDateFilter();
    });
  }

  dateChanged(date: DateFilter) {
    this.filterApplied = !!(date.startDate || date.endDate);
    this.dateFilter = date;
    this.applyDateFilter();
  }

  private applyDateFilter() {
    const date = this.dateFilter;

    if (!date) return;

    if (date.startDate && date.endDate) {
      this.filteredUsers = this.users.filter((u) => u.join_date * 1000 <= +date.endDate && u.join_date * 1000 >= +date.startDate);
    }
    else if (!date.startDate && date.endDate) {
      this.filteredUsers = this.users.filter((u) => u.join_date * 1000 <= +date.endDate);
    }
    else if (!date.endDate && date.startDate) {
      this.filteredUsers = this.users.filter((u) => {
        return u.join_date * 1000 >= +date.startDate;
      });
    }
  }
}
