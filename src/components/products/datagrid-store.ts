import { allTasks,  map, MapStore, onMount, task } from 'nanostores';
import { fakeJsonData } from './fakeData';

export interface PriceInTime {
  timestamp:               string;
  "is-on-promotion":       boolean;
  price:                   number;
  "price-per-unit":        string;
  "regular-price":         number;
  "price-per-unit-number": number;
  "best-price":            number;
  "stock-status":          string;
  "is-new":                boolean;
}

export interface DataGridRow {
  id:                      number;
  name:                    string;
  // "category-names":        string[];
  "category-name":         string;
  // "allergens-filter":      string[] | null;
  // "sales-unit":            string;
  title:                   string;
  "code-internal":         number;
  "created-at":            string;
  // "image-url":             string;
  // "approx-weight-product": boolean;
  url:                     string;
  brand:                   string;
  "price-in-time":         PriceInTime[];
}

export interface Query {
  category: string | null,
  history: string,
}

export type DataGridType = {
  rows: DataGridRow[],
  sortModel: any,
  query: Query,
  queryURL: string,
  productID: number | null,
  productURL: string,
}

export const dataGridStore = map<DataGridType>({
  rows: [],
  sortModel: null,
  query: {
    category: "null",
    history: "last",
  },
  queryURL: "https://multimo.ml/products/v1/all",
  productID: null,
  productURL: "https://multimo.ml/products/v1/",
});


export function setSortModel(sortName?: string, sortDirection?: 'asc'| 'desc') {
  let sortModel = [
    {
      field: sortName,
      sort: sortDirection,
    },
  ];

  if (!sortName && !sortDirection) sortModel = []

  dataGridStore.setKey('sortModel', sortModel)
}

export async function updateRows() {

  const dataGrid = dataGridStore.get()

  if (dataGrid.query.category == null) return;

  const completeURL = `${dataGrid.queryURL}?category=${dataGrid.query.category}&history=${dataGrid.query.history}`
  
  let rows: DataGridRow[] = []
  
  const response = await fetch(completeURL).catch(error => {
    console.debug(error)
  });

  if (response && response.ok) {
    rows = await response.json();
  } else {
    rows = fakeJsonData;
  }

  dataGridStore.setKey("rows", rows)
}
