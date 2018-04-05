export interface IConfig {
  apiHost: string;
  apiPort: number;
  apiDomain: string;
  jiraApiBaseUrl: string;
}

const apiConfig: any = {
  fakeApi: {
    host: process.env.APIHOST || 'localhost',
    port: process.env.APIPORT || 3001,
  },
  realApi: {
    host: process.env.APIHOST || 'jira.rakuten-it.com',
    port: process.env.APIPORT,
  },
}[process.env.USE_FAKE_API ? 'fakeApi' : 'realApi'];

const apiDomain: string = `https://${apiConfig.host}${apiConfig.port ? ':' + apiConfig.port : ''}`;

const config: IConfig = {
  apiHost: apiConfig.host,
  apiPort: apiConfig.port,
  apiDomain,
  jiraApiBaseUrl: `/jira/rest/api/latest/issue`,
};

export default config;
