import { environment } from 'src/environments/environment';

export function Root(path: string) {
  return environment.URL + path;
}

// export * from './i18n/translate';
