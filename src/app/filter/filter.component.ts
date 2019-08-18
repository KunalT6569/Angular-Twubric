import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { Sortable, SortOrder, DateFilter, SortModel } from '../types/app.types'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() onSortChanged = new EventEmitter<SortModel>()
  @Output() onDateChanged = new EventEmitter<DateFilter>()

  sortItems: Sortable[] = [];
  selectedFilter: string;
  sortingOrder: SortOrder = 'default';

  startDate: Date;
  endDate: Date;

  constructor () { }

  ngOnInit() {
    this.createSortable('total', 'Twubric Score')
    this.createSortable('friends', 'Friends')
    this.createSortable('influence', 'Influence')
    this.createSortable('chirpiness', 'Chirpiness')
  }

  private createSortable(key: string, title: string): void {
    this.sortItems.push({ title, key })
  }

  emitSort(key: string) {
    if (this.selectedFilter !== key) {
      this.sortingOrder = 'asc'
    } else {
      switch (this.sortingOrder) {
        case 'asc':
          this.sortingOrder = 'desc'
          break
        case 'desc':
          this.sortingOrder = 'default'
          break
        case 'default':
          this.sortingOrder = 'asc'
          break
      }
    }

    this.selectedFilter = key
    this.onSortChanged.emit({ key: key, order: this.sortingOrder })
  }

  onDateChange(date: DateFilter) {
    this.onDateChanged.emit(date);
  }

  onStartDateChange(date: Date) {
    this.onDateChange({
      startDate: date,
      endDate: this.endDate
    });
  }

  onEndDateChange(date: Date) {
    this.onDateChange({
      startDate: this.startDate,
      endDate: date
    });
  }
}
