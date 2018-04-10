import * as React from 'react';

import moment = require('moment');

import { forEach, map } from 'lodash';

import { DateFormats, parseDate } from '../../modules/utils/dateUtils';

import { ITimelineChartOptions, ITimelineData } from '../Charts/TimelineChart';
import generateAndGetChartData from './timelineDataGenerator';

export default class AssisgnHistoryTimeline extends React.Component<any, any> {

  private chartOptions: ITimelineChartOptions;

  constructor(props: any, state: any) {
    super(props, state);

    this.chartOptions = {
      data: [],
      otherOptions: {
        options: {
          hAxis: {
            format: 'yyyy-MM-dd',
          },
        },
      },
    };
  }

  public componentWillMount() {
    this.chartOptions.data = generateAndGetChartData(this.props.data);
  }

  public render() {
    return (
      <div>
        abc
      </div>
    );
  }
}
