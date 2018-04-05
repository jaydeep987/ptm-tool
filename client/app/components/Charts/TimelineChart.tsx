import * as React from 'react';

import { GoogleCharts } from 'google-charts';
import { map } from 'lodash';

import { Moment } from 'moment';
import { DateFormats, Delimiters, formatDate } from '../../modules/utils/dateUtils';
import { getUniqueShortId } from '../../modules/utils/stringUtils';

declare global {
  /* tslint:disable-next-line:interface-name */
  interface Window {
    google: any;
  }
}
function getFormattedDate(): string {
  return formatDate(DateFormats.YYYYMMDD)(this.y);
}

function getToolTip(): string {
  return `${this.series.name} <br/> ${formatDate(DateFormats.YYYYMMDD)(this.y)}`;
}

export interface ITimelineChartOptions {
  data: ITimelineData[];
  otherOptions?: any;
}

export interface ITimelineData {
  position: string;
  name: string;
  startDate: Moment;
  endDate: Moment;
}

export interface ITimelineChartOptionsAll extends ITimelineChartOptions, google.visualization.ChartSpecs {
}

export interface ITimelineChartProps {
  chartOptions: ITimelineChartOptions;
}

export default class TimelineChart extends React.Component<ITimelineChartProps, any> {

  private chartOptions: ITimelineChartOptionsAll;

  constructor(props: ITimelineChartProps, state: any) {
    super(props, state);

    const fixedOptions: google.visualization.ChartSpecs = {
      chartType: 'Timeline',
      options: {
        legend: 'none',
      },
    };

    const chartOptions: ITimelineChartOptions = this.props.chartOptions;
    const defaultOptions: google.visualization.ChartSpecs = {
      chartType: fixedOptions.chartType, // just to satisfy ts
      containerId: `timeline_${getUniqueShortId()}`,
      options: {
        chartArea: {
          width: '90%',
        },
      },
    };

    this.chartOptions = {
      data: chartOptions.data,
      ...defaultOptions,
      ...fixedOptions,
      options: { ...defaultOptions.options, ...chartOptions.otherOptions.options, ...fixedOptions.options },
    };
  }

  public componentDidMount() {
    const google =  window.google;

    this.drawTimeLine = this.drawTimeLine.bind(this);
    GoogleCharts.load(this.drawTimeLine, 'timeline');
  }

  public render() {
    return (
      <div>
        <div id={this.chartOptions.containerId || 'gantt-chart'} />
      </div>
    );
  }

  private drawTimeLine() {
    const container: Element = document.getElementById(this.chartOptions.containerId);
    const dataTable = new GoogleCharts.api.visualization.DataTable();
    const chart: google.visualization.Timeline = new GoogleCharts.api.visualization.Timeline(container);
    let data: any[];

    dataTable.addColumn('string', 'Position');
    dataTable.addColumn('string', 'Name');
    dataTable.addColumn('date', 'Start');
    dataTable.addColumn('date', 'End');

    // To add data rows, get it from chartOptions. that will be object of type ITimelineData
    // So we have to convert them to array and add to dataTable
    data = this.chartOptions.data.map((dataObj: ITimelineData) => {
      return map(dataObj, (value: any, key) => {
        if (key === 'startDate' || key === 'endDate') {
          return value.toDate();
        }
        return value;
      });
    });

    // add all rows
    dataTable.addRows(data);

    // draw chart
    chart.draw(dataTable);
  }
}
