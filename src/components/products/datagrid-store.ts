import { map } from 'nanostores';
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
  id:                      string;
  name:                    string;
  "category-names":        string[];
  "category-name":         string;
  "allergens-filter":      string[] | null;
  "sales-unit":            string;
  title:                   string;
  "code-internal":         number;
  "created-at":            string;
  "image-url":             string;
  "approx-weight-product": boolean;
  url:                     string;
  brand:                   string;
  "price-in-time":         PriceInTime[];
}

export type DataGridType = {
  rows: DataGridRow[],
  sortModel: any,
  queryCategory: string | undefined,
  queryHistory: string,
  queryURL: string,
  id: string | null,
  productURL: string,
  productData: DataGridRow | null,
  qrURL: string,
  qrData: any,
}

export const dataGridStore = map<DataGridType>({
  rows: [],
  sortModel: null,
  queryCategory: "null",
  queryHistory: "last",
  queryURL: "https://multimo.ml/products/v1/all",
  id: null,
  productURL: "https://multimo.ml/products/v1/", // :id
  productData: null,
  qrURL: "https://multimo.ml/qr/v1/", // :id
  qrData: null,
});

updateRows()

dataGridStore.listen((value, changed) => {
  console.log(`dataGridStore.listen: ${changed} new value ${value[changed]}`)

  if (changed === "queryCategory") {
    console.log("changed === queryCategory")
    updateRows()
  }

  if (changed === "id") {
    console.log("changed === id")
    updateProductAndQR()
  }
})


export function setSortModel(sortName?: string, sortDirection?: 'asc'| 'desc') {
  console.log("setSortModel")

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
  console.log("updateRows")

  const dataGrid = dataGridStore.get()

  if (dataGrid.queryCategory == null) return;

  const completeURL = `${dataGrid.queryURL}?category=${dataGrid.queryCategory}&history=${dataGrid.queryHistory}`
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

export async function updateProductAndQR() {
  console.log("updateProductAndQR")

  const dataGrid = dataGridStore.get()

  if (dataGrid.id == null) return;

  const responseProduct = await fetch(dataGrid.productURL+dataGrid.id+"?history=full").catch(error => {
    console.debug(error)
  });

  let productBody: DataGridRow

  if (responseProduct && responseProduct.ok) {
    productBody = await responseProduct.json();
  } else {
    return;
  }

  dataGridStore.setKey("productData", productBody)

  const responseQR = await fetch(dataGrid.qrURL+dataGrid.id).catch(error => {
    console.debug(error)
  });

  let qrBody: any

  if (responseQR && responseQR.ok) {
    qrBody = await responseQR.blob();
  } else {
    return;
  }

  let reader = new FileReader();
  reader.readAsDataURL(qrBody);
  reader.onloadend = function () {
    let base64String = reader.result;

    dataGridStore.setKey("qrData", base64String)
  }
}

