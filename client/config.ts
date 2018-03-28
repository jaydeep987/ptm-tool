export interface IConfig {
  apiHost: string;
  apiPort: number;
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

const config: IConfig = {
  apiHost: apiConfig.host,
  apiPort: apiConfig.port,
};

export default config;
