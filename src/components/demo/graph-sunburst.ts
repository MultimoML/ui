import type { Serie } from "@nivo/line"
import type { MapStore } from "nanostores"

import { groupBy, sortBy } from "./graph-bar"
import type { Dict, DemoGraph } from "./graph-store"

export function updateGraphSunburst(graphParams: MapStore<DemoGraph>) {
  const unprocessedData = graphParams.get().unprocessedData
  const indexBy =  graphParams.get().indexBy
  const keyBy =  graphParams.get().keyBy

  const grouped: Serie[] = groupBy(unprocessedData, indexBy);
  const quantified: Serie[] = quantify(grouped, indexBy, keyBy);
  const sorted: Serie[] = recursiveSort(quantified);

  const processedData = {
    name: "nivo",
    children: sorted,
  }
  
  graphParams.setKey('processedDataGraphSunburst', processedData)
};

function quantify(data: Serie[], index: string, key: string): Serie[] {
  data.forEach((serieL1) => {
    const L1nameValue = index + ": " + serieL1[index]
    serieL1.data.forEach((unQSerieL2) => {
      const unQSerieL2Value = unQSerieL2[key]

      if (!("children" in serieL1)) {
        serieL1["children"] = [];
      }

      const nameValue = L1nameValue + ": " + key + ": " + unQSerieL2Value

      let foundMatch = false;
      serieL1["children"].forEach((serieL2: Dict) => {
        if (serieL2['name'] == nameValue) {
          serieL2['loc']++;
          foundMatch = true;
          return;
        }
      });

      if (!foundMatch) {
        serieL1["children"].push({
          name: nameValue,
          loc: 1,
        })
      }
    })

    serieL1['name'] = L1nameValue
    delete serieL1[index]
    serieL1.data = []
  })

  return data;
}

function recursiveSort(data: Serie[]): Serie[] {
  const key = 'name';
  const sorted = sortBy(data, key)
  sorted.forEach((serieL2) => {
    serieL2['children'].sort((data1: Dict, data2: Dict) => {
      return data1[key].localeCompare(data2[key]);
    })
  })

  return sorted;
}