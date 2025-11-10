import { Constructable } from 'typedi';
import { join } from 'node:path';

import Backend, { FsBackendOptions } from 'i18next-fs-backend';
import i18next, { Module } from 'i18next';

import { IBootstrapableService } from '@interfaces/bootstrapable.interface';
import { nonNullable } from '@common/utils/non-nullable.util';
import { config } from '@common/config/config.service';
import { TranslateFunc } from '@common/i18n/types';

export class I18nBootstrapable implements IBootstrapableService {
  public readonly i18n = i18next;
  public readonly exists = this.i18n.exists;
  public translateFunction?: TranslateFunc<string, string>;

  public async bootstrap(saveMissing?: boolean): Promise<void> {
    const [backendKlass, backendOptions] = this.getBackendWithOptions();

    this.translateFunction = await this.i18n.use(backendKlass).init({
      fallbackLng: 'en',
      preload: ['en', 'hu', 'ro'],
      supportedLngs: ['en', 'hu', 'ro'],
      backend: backendOptions,
      saveMissing: saveMissing ?? (!config.isProduction && !config.isTest),
      initImmediate: true,
      interpolation: {
        defaultVariables: {}
      }
    });
  }

  public get t(): TranslateFunc<string, string> {
    return nonNullable(this.translateFunction);
  }

  public teardown(): Promise<void> {
    return Promise.resolve();
  }

  private getBackendWithOptions(): [Constructable<Module>, FsBackendOptions] {
    return [
      Backend,
      {
        loadPath: join(__dirname, '../../../../locales/{{lng}}.json'),
        addPath: join(__dirname, '../../../../locales/{{lng}}.missing.json')
      }
    ];
  }
}

export const i18nService = new I18nBootstrapable();
