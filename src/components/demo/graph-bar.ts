import type { Serie } from "@nivo/line"
import type { MapStore } from "nanostores"

import type { Dict, DemoGraph } from "./graph-store"

export function updateGraphBar(graphParams: MapStore<DemoGraph>) {
  const unprocessedData = graphParams.get().unprocessedData
  const indexBy =  graphParams.get().indexBy
  const keyBy =  graphParams.get().keyBy
  const transformKeyToNegative = graphParams.get().transformKeyToNegative

  const grouped: Serie[] = groupBy(unprocessedData,indexBy);
  const sorted: Serie[] = sortBy(grouped, indexBy);
  const quantified: Serie[] = quantify(sorted);

  const negated: Serie[] = negateKey(quantified, transformKeyToNegative)

  const processedData = negated
  const keyByKeys = key(processedData, keyBy)
  
  graphParams.setKey('keyByKeys', keyByKeys)
  graphParams.setKey('processedDataGraphBar', processedData)
};


export function groupBy(data: Serie[], key: string): Serie[]  {
  const processedData: Serie[] = []

  data.map((item: Serie) => {
    const value = item[key]
    const itemDict: Dict = [];

    // remove id and data from item and turn into regular dict
    for(const itemKey in item) {
      if (!["id", "data", key].includes(itemKey))
        itemDict[itemKey] = item[itemKey]
    }

    // get current matching record for key in processedData or create a new one
    const potentialGroup: Serie[] = processedData.filter((entry) => entry[key] == value).map((entry) => { return entry});

    let group: Serie = {
      id: processedData.length,
      data: [],
    }

    // get key into array value
    group[key] = value

    if (potentialGroup.length != 0) {
      group = potentialGroup[0]
    }
    
    group.data.push(itemDict);

    // new group needs to be pushed into processedData
    if (group.data.length == 1) {
      
      processedData.push(group);
    }
  });

  return processedData
}

export function sortBy(data: Serie[], key: string): Serie[] {
  return data.sort((data1: Serie, data2: Serie) => {
    if (!isNaN(data1[key])) 
      return data1[key] - data2[key];
    else
      return String(data1[key]).localeCompare(data2[key]);
  })
}

function quantify(data: Serie[]): Serie[] {
  for (const dataKey in data) {
    const dataValue = data[dataKey]

    dataValue.data.forEach((item) => {
      for (const itemKey in item) {
        const itemValue = item[itemKey]

        const newKey = itemKey+": "+itemValue
        if (!dataValue[newKey])
          dataValue[newKey] = 0

        dataValue[newKey] += 1
      }
    })

    dataValue.data = []
  }

  return data;
}

function key(data: Serie[], key: string): string[] {
  const keys: string[] = []
  data.forEach((item) => {
    for(const itemKey in item) {
      if (itemKey.includes(key))
        if (!keys.includes(itemKey))
          keys.push(itemKey)
    }
  })

  return keys.sort()
}

function negateKey(data: Serie[], key: string): Serie[] {
  const dataCopy: Serie[] = [...data]

  if (key.length == 0)
    return dataCopy

  dataCopy.map((item) => {
    for (const itemKey in item) {
      if (itemKey.includes(key))
        item[itemKey] = -item[itemKey]
    }
  })

  return dataCopy
}
