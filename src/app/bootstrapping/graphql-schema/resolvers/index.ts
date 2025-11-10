import type { NonEmptyArray } from 'type-graphql';

import { ImportResolver } from '@entities/import/import.resolver';
import { UserResolver } from '@/app/entities/user/user.resolver';
import { FarmResolver } from '@/app/entities/farm/farm.resolver';
import { JobResolver } from '@/app/entities/job/job.resolver';
import { BotanicSpecieResolver } from '@entities/botanic-specie/botanic-specie.resolver';
import { SeedVarietyResolver } from '@entities/seed-variety/seed-variety.resolver';
import { FertilizerResolver } from '@entities/fertilizer/fertilizer.resolver';
import { MeasureResolver } from '@entities/measure/measure.resolver';
import { InputCategoryResolver } from '@entities/input-category/input-category.resolver';
import { InputResolver } from '@entities/input/input.resolver';
import { ProviderResolver } from '@entities/provider/provider.resolver';
import { SeedResolver } from '@entities/seed/seed.resolver';
import { PesticideIngredientResolver } from '@entities/pesticide-ingredient/pesticide-ingredient.resolver';
import { PesticideResolver } from '@entities/pesticide/pesticide.resolver';
import { FieldResolver } from '@entities/field/field.resolver';
import { FieldCultureResolver } from '@entities/field-culture/field-culture.resolver';
import { JobCategoryResolver } from '@entities/job-category/job-category.resolver';
import { JobItemResolver } from '@entities/job-item/job-item.resolver';
import { CropResolver } from '@entities/crop/crop.resolver';
import { JobOutputResolver } from '@entities/job-output/job-output.resolver';
import { FieldSeasonResolver } from '@entities/field-season/field-season.resolver';
import { CurrencyResolver } from '@entities/currency/currency.resolver';
import { AvatarImageResolver } from '@entities/avatar-image/avatar-image.resolver';
import { PasswordResetTokenResolver } from '@entities/password-reset-token/password-reset-token.resolver';
import { InvoiceResolver } from '@entities/invoice/invoice.resolver';
import { InventoryItemResolver } from '@entities/inventory-item/inventory-item.resolver';
import { InvoiceItemResolver } from '@entities/invoice-item/invoice-item.resolver';
import { SharedInvoiceItemResolver } from '@entities/invoice-item/shared-invoice-item.resolver';
import { SubscriptionResolver } from '@entities/subscription/subscription.resolver';

const resolvers: NonEmptyArray<Function> = [
  PesticideIngredientResolver,
  CropResolver,
  BotanicSpecieResolver,
  InputCategoryResolver,
  FieldCultureResolver,
  JobCategoryResolver,
  SeedVarietyResolver,
  FieldSeasonResolver,
  FertilizerResolver,
  PesticideResolver,
  JobOutputResolver,
  ProviderResolver,
  JobItemResolver,
  MeasureResolver,
  ImportResolver,
  FieldResolver,
  InputResolver,
  UserResolver,
  FarmResolver,
  SeedResolver,
  JobResolver,
  AvatarImageResolver,
  PasswordResetTokenResolver,
  InvoiceResolver,
  InvoiceItemResolver,
  InventoryItemResolver,
  CurrencyResolver,
  SharedInvoiceItemResolver,
  CurrencyResolver,
  SubscriptionResolver
];

export default resolvers;
