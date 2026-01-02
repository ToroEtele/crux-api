import { Constructable } from '@common/base-types/constructable.type';
import { ScopingFunction } from '../types/scoping-function.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const defaultScopeMappings = new Map<Constructable<any>, ScopingFunction<any>>([]);
