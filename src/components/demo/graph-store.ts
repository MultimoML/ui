import type { Serie } from '@nivo/line';
import { allTasks,  map, MapStore, onMount, task } from 'nanostores';
import Papa from 'papaparse';

import { updateGraphBar } from './graph-bar';
import { updateGraphSunburst } from './graph-sunburst';

import { GraphRawCSVData } from './graph-data'

export interface Dict { [key: string]: any }

export type DemoGraph = {
  unprocessedData: Serie[],
  processedDataGraphBar: Serie[],
  processedDataGraphSunburst: Object,
  indexBy: string,
  keyBy: string,
  keyByKeys: string[], // generated from keyBy
  allKeys: string[], // generated from csv headers
  transformKeyToNegative: string,
}

export const graphParams = map<DemoGraph>({
  unprocessedData: [],
  processedDataGraphBar: [],
  processedDataGraphSunburst: {},
  indexBy: "Hours",
  keyBy: "Breakfast",
  keyByKeys: [],
  allKeys: [],
  transformKeyToNegative: "No",
});

onMount(graphParams, () => {
  task(async () => {
    loadCsv(graphParams)
  })
})

/*
graphParams.subscribe((graphParamsReadOnly, changedValue) => {
  if (changedValue && changedValue in ['indexBy', 'keyBy'])
    updateGraph(graphParams)
})
*/
await allTasks()


export function setIndexBy(indexBy: string) {
  if (graphParams.get().allKeys.includes(indexBy)) {
    graphParams.setKey('indexBy', indexBy)
    update()
  } else {
    console.debug('setIndexBy', "'"+indexBy+"'", 'not found in', graphParams.get().allKeys)
  }
}

export function setKeyBy(keyBy: string) {
  if (graphParams.get().allKeys.includes(keyBy)) {
    graphParams.setKey('keyBy', keyBy)
    update()
  } else {
    console.debug('setKeyBy', keyBy, 'not found in', graphParams.get().allKeys)
  }
}

export function setNegativeValues(keyBy: string) {
  graphParams.setKey('transformKeyToNegative', keyBy)
  update()
}

export function update(){
  updateGraphBar(graphParams)
  updateGraphSunburst(graphParams)
}




function loadCsv(graphParams: MapStore<DemoGraph>) {
  // load raw csv into data
  const config = {
    header: true,
    dynamicTyping: true,
    complete: (result: any) => {

      graphParams.setKey('allKeys', result.meta["fields"])  
      
      const remap: Serie[] = result.data.map((data: Serie, index: number) => {
        data.id = index;
        data.data = [];
        return data;
      })

      graphParams.setKey('unprocessedData', remap)
    },
    error: (error: any) => {
      console.debug(error)
    }
  };

  Papa.parse(GraphRawCSVData, config);
}
