import { forEach } from 'lodash';
import moment = require('moment');

import { DateFormats, parseDate } from '../../modules/utils/dateUtils';

function filterJiraWiseFields(items: any[], jiraWiseFields: any = {}, jiraId: string, valueToCompare: string): any {
  const filteredItems = items.filter((item: any) => {
    return item.field.replace(/\s/g, '') === valueToCompare.replace(/\s/g, '');
  });

  if (filteredItems.length) {
    jiraWiseFields[jiraId] = jiraWiseFields[jiraId]
      ? [...jiraWiseFields[jiraId], ...filteredItems]
      : filteredItems;
  }

  return jiraWiseFields;
}

function getLatestCreatedDateData(data): any {
  const jiraWiseDates: any = {};

  forEach(data, (items, jiraId) => {
    // first sort in decending order
    items.sort((obj1: any, obj2: any) => obj2.created - obj1.created);
    // and then keep only latest created date item
    jiraWiseDates[jiraId] = {
      ...items[0],
      to: parseDate(DateFormats.YYYYMMDD)(items[0].to),
    };
  });

  return jiraWiseDates;
}

function generateAndGetTimelineData({ jiraWiseAsigneeFields, jiraWiseStartDates, jiraWiseEndDates}): any[] {
  const timeLineData: any[] = [];

  forEach(jiraWiseAsigneeFields, (items, jiraId: string) => {
    let lastItem: any;

    items.sort((obj1: any, obj2: any) => obj1.created - obj2.created);
    lastItem = items[items.length - 1];
    /*
      How to get start and end date of assignee
      - on date D1, ticket assigned from person A to B, then D1 is end date of A and start date of B
      - same for next item, ticket assigned from person B to C on date D2, then D2 is end date of B and D2 is start date of C. (start date of B is D1)
      - so here, start date of A and end date of C is missing, but that's basically when start and end date of whole jira task
      - reducer gives prev and cur item of array, so iterations like:
        1. at first we don't have prevItem so for A ("from") start date is jira's start date and end date is currentItem's date
        2. now we have prevItem, so for B start date is prevItem's date and end date is currentItem's date
        3. Iteration ended
      - Now start and end date of last item is still missing, so we can take last item of array and take C ("to") and last item's date as start date
        and jira's end date as C's end date.
    */
    items.reduce((prevItem, curItem) => {
      if (curItem.from) {
        timeLineData.push({
          position: jiraId,
          name: curItem.from,
          startDate: !prevItem ? jiraWiseStartDates[jiraId].to : prevItem.created,
          endDate: curItem.created,
        });
      }
      return curItem;
    }, undefined);
    // For last assignee, start and end date
    timeLineData.push({
      position: jiraId,
      name: lastItem.from,
      startDate: lastItem.created,
      endDate: jiraWiseEndDates[jiraId].to,
    });
  });

  return timeLineData;
}

function generateAndGetChartData(data): any[] {
  const jiraIssues: any[] = data.issues;

  let jiraWiseAsigneeFields: any;
  let jiraWiseStartDates: any;
  let jiraWiseEndDates: any;
  let timeLineData: any[];

  // Iterate all over issues, i.e. all jira tickets
  jiraIssues.map((jiraIssue) => {
    const changeLog = jiraIssue.changelog;
    const jiraId = jiraIssue.key;

    // Extract required data: Assignee fields, Start/End date fields
    changeLog.histories.map((historyObj) => {
      const modifiedItems: any[] = [];
      let modifiedItem;

      if (historyObj.items) {
        historyObj.items.map((item) => {
          // modift items with additional fields added
          modifiedItem = {
            ...item,
            jiraId,
            created: moment(historyObj.created),
          };
          modifiedItems.push(modifiedItem);
        });

        jiraWiseAsigneeFields = filterJiraWiseFields(modifiedItems, jiraWiseAsigneeFields, jiraId, 'assignee');
        jiraWiseStartDates = filterJiraWiseFields(modifiedItems, jiraWiseStartDates, jiraId, 'Start Date (WBSGantt)');
        jiraWiseEndDates = filterJiraWiseFields(modifiedItems, jiraWiseEndDates, jiraId, 'End Date (WBSGantt)');
      }
    }); // /changeLog.histories
  }); // /jiraIssues

  jiraWiseStartDates = getLatestCreatedDateData(jiraWiseStartDates);
  jiraWiseEndDates = getLatestCreatedDateData(jiraWiseEndDates);

  timeLineData = generateAndGetTimelineData({ jiraWiseAsigneeFields, jiraWiseStartDates, jiraWiseEndDates });

  return timeLineData;
}

export default generateAndGetChartData;
