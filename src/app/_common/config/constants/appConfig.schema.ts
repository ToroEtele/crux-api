import convict from 'convict';

import { loadDotEnv } from '../external/loadDotenv';

loadDotEnv(process.env.NODE_ENV === 'test' ? '.env.test' : '.env');

export const convictSchema = {
  app: {
    environment: {
      doc: 'The application environment.',
      format: ['production', 'development', 'test'],
      default: 'development',
      env: 'NODE_ENV'
    },
    origins: {
      doc: 'Allowed CORS origins.',
      format: Array,
      default: ['http://localhost:3000'],
      env: 'ORIGINS',
      coerce: (value: string | string[]) => {
        if (Array.isArray(value)) return value;
        return value.split(',').map((v) => v.trim());
      }
    },
    port: {
      doc: 'The port to bind.',
      format: String,
      default: 3000,
      env: 'PORT'
    },
    hostname: {
      doc: 'The address to bind.',
      format: String,
      default: '127.0.0.1',
      env: 'HOSTNAME'
    },
    graphqlPath: {
      doc: 'The graphql path to bind.',
      default: '/',
      env: 'GRAPHQL_PATH'
    },
    logLevel: {
      format: ['SILENT', 'TRACE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'],
      default: 'INFO',
      env: 'LOG_LEVEL'
    },
    databaseUrl: {
      doc: 'The url to mysql database.',
      format: String,
      default: null,
      env: 'DATABASE_URL'
    },
    authUrl: {
      format: String,
      default: 'http://localhost:9000',
      env: 'AUTH_URL'
    }
  }
};

export type AppConfigType = convict.Schema<typeof convictSchema>;
export const appConfig = convict(convictSchema);
