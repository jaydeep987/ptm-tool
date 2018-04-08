export interface IConfig {
  jiraAPIHost: string;
  jiraAPIPort: number;
  ptmAPIHost: string;
  ptmAPIPort: number;
  apiDomain: IApiDomain;
  jiraApiBaseUrl: string;
  ptmApiBaseUrl: string;
}

export interface IApiDomain {
  jiraApi: string;
  ptmApi: string;
}

export enum NODE_ENV {
  DEV = 'development',
  PROD = 'production',
}

const apiConfig: any = {
  dev: {
    host: process.env.DEVAPIHOST || 'localhost',
    port: process.env.DEVAPIPORT || 3001,
  },
  prod: {
    ptmApi: {
      host: process.env.PTMAPIHOST || 'localhost',
      port: process.env.PTMAPIPORT || 3001,
    },
    jiraApi: {
      host: process.env.JIRAAPIHOST || 'jira.rakuten-it.com',
      port: process.env.JIRAAPIPORT,
    },
  },
};

let api: any;

if (process.env.NODE_ENV === NODE_ENV.DEV) {
  api = {
    jiraApi: {
      ...apiConfig.dev,
    },
    ptmApi: {
      ...apiConfig.dev,
    },
  };
} else {
  api = {
    ...apiConfig.prod,
  };
}

// If want to use ptm api for jira api requests too, in prod
if (process.env.PTM_JIRA_API) {
  api = {
    ...api,
    jiraApi: {
      ...apiConfig.dev,
    },
  };
}

const apiDomain: IApiDomain = {
  jiraApi: `https://${api.jiraApi.host}${api.jiraApi.port ? `:${api.jiraApi.port}` : ''}`,
  ptmApi: `https://${api.ptmApi.host}${api.ptmApi.port ? `:${api.ptmApi.port}` : ''}`,
};

const config: IConfig = {
  ...api,
  apiDomain: { ...apiDomain },
  jiraApiBaseUrl: '/jira/rest/api/latest/issue',
  ptmApiBaseUrl: '/ptm/',
};

export default config;
