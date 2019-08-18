export type User = {
  uid: number;
  username: string;
  image: string;
  fullname: string;
  twubric: Twubric;
  join_date: number;
}

type Twubric = {
    total: number;
    friends: number;
    influence: number;
    chirpiness: number;
}

export type Sortable = {
  key: string;
  title: string;
}

export type SortOrder = 'asc' | 'desc' | 'default';

export type DateFilter = {
  startDate: Date;
  endDate: Date;
}

export type SortModel = {
  key: string;
  order: SortOrder;
}