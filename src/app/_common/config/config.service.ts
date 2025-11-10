import { LogLevel } from '../logging/constants/log-level.enum';
import { appConfig } from './constants/appConfig.schema';

import { Environment } from './constants/environment.enum';

export class ConfigService {
  private static instance: ConfigService;

  private readonly isValidationEnabled = process.env.DISABLE_CONFIG_VALIDATION === undefined;

  private readonly config: typeof appConfig = appConfig;

  private constructor(config?: typeof appConfig) {
    if (config) this.config = config;
  }

  public environment: Environment = <Environment>this.config.get('app.environment');
  public isProduction: boolean = this.environment === Environment.Production;
  public isTest: boolean = this.environment === Environment.Testing;
  public logLevel: LogLevel = <LogLevel>this.config.get('app.logLevel');

  public authUrl: string = this.config.get('app.authUrl');
  public graphqlPath: string = this.config.get('app.graphqlPath');
  public hostname: string = this.config.get('app.hostname');
  public port: number = this.config.get('app.port');

  public origins: string[] = this.getOrigins();

  public databaseUrl: string = this.getStrictString('app.databaseUrl', this.config.get('app.databaseUrl'));

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) this.refresh();

    return ConfigService.instance;
  }

  public static refresh(): void {
    ConfigService.instance = new ConfigService();
  }

  public validate(): void {
    if (this.isValidationEnabled) {
      this.config.validate({ allowed: 'strict' });
    }
  }

  private getStrictString(keyName: string, configValue?: string | null): string {
    if (this.isValidationEnabled && (typeof configValue !== 'string' || configValue.length === 0)) {
      throw new Error(`Missing config value for ${keyName}.`);
    }

    return <string>configValue;
  }

  private getOrigins(): string[] {
    const value = this.config.get('app.origins') as unknown as string | string[];

    if (Array.isArray(value)) return value;

    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value.split(',').map((v) => v.trim());
      }
    }

    return ['http://localhost:3000'];
  }
}

export const config = ConfigService.getInstance();
