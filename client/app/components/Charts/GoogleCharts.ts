import * as React from 'react';
import * as ReactDOM from 'react-dom';

const loadScript = Symbol('loadScript');

declare global {
  /* tslint:disable-next-line:interface-name */
  interface Window {
    google?: any;
  }
}

export class GetGoogleCharts {
  api: any;
  private scriptPromise: any;

  loadScript() {
    if (!this.scriptPromise) {
      this.scriptPromise = new Promise((resolve) => {
        const body = document.getElementsByTagName('body')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = () => {
          this.api = window.google;
          this.api.charts.load('current', { packages: ['corechart', 'table'] });
          this.api.charts.setOnLoadCallback(() => {
            resolve();
          });
        };
        script.src = 'https://www.gstatic.com/charts/loader.js';
        body.appendChild(script);
      });
    }
    return this.scriptPromise;
  }

  load(callback, type) {
    return this.loadScript().then(() => {
      if (type) {
        if (!Array.isArray(type)) {
          type = [type];
        }
        this.api.charts.load('current', { packages: type });
        this.api.charts.setOnLoadCallback(callback);
      } else {
        callback();
      }
    });
  }
}

const GoogleCharts = new GetGoogleCharts();
export default GoogleCharts;
