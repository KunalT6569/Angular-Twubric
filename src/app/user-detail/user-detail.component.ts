import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../types/app.types';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Output() onRemoveUser = new EventEmitter();

  constructor() {}

  ngOnInit() { }
  
  removeUser() {
    this.onRemoveUser.emit();
  }
}
