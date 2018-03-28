import * as React from 'react';

import { GanttChart } from '@hh.ru/react-d3-chart-graphs';
import { timeFormat } from 'd3-time-format';

export default class AssisgnHistoryGraph extends React.Component<any, any> {
  private data: object[];

  constructor(props: any, state: any) {
    super(props, state);
    this.data = [
    ];
  }

  public render() {
    const axesProps = {
      legend: {
          xAxis: 'Timeline',
          yAxis: 'Tasks',
      },
      padding: {
          xAxis: 5,
          yAxis: 5,
      },
      tickFormat: {
          xAxis: timeFormat('%Y/%m/%d'),
      },
    };
    const stackColors = {};
    return (
      <GanttChart
        axesProps={axesProps}
        data={this.props.data}
        paddingMultiplier={0.6}
        stackColors={stackColors}
      />
    );
  }
}
