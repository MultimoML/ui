import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveSunburst } from '@nivo/sunburst'
import { useStore } from '@nanostores/react';

import { graphParams } from './graph-store';

export function CustomResponsiveBar() {
  const $graphParams = useStore(graphParams);

  return (
    <ResponsiveBar
      className='h-full'
      data={$graphParams.processedDataGraphBar}
      margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
      indexBy={$graphParams.indexBy}
      keys={$graphParams.keyByKeys}
      padding={0.1}
      colors={{ scheme: 'nivo' }}
      innerPadding={1}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: $graphParams.indexBy,
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: $graphParams.keyBy,
        legendPosition: 'middle',
        legendOffset: -40
      }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                  itemOpacity: 1
              }
            }
          ]
        }
      ]}
      role="application"
    />
  )
}

export function CustomResponsiveSunburst() {
  const $graphParams = useStore(graphParams);

  return (
    <>
    { /* <div>{JSON.stringify($graphParams.processedDataGraphSunburst)}</div> */ }
    <ResponsiveSunburst
      className='h-full'
      data={$graphParams.processedDataGraphSunburst}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      id='name'
      value='loc'
      cornerRadius={6}
      borderColor={"#ffffff"}
      borderWidth={3}
      colors={{ scheme: 'nivo' }}
      childColor={{ from: 'color', modifiers: [['brighter', 0.3]] }}
      enableArcLabels={true}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
    />
    </>
  )
}