import { databaseConnection } from './database-connection';
import { i18nService } from './i18n.bootstrapable';
import { webserver } from './webserver';

export const bootstrapableServices = [databaseConnection, webserver, i18nService];
