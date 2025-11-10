import { Constructable } from '@common/base-types/constructable.type';
import { ScopingFunction } from '../types/scoping-function.type';

export const defaultScopeMappings = new Map<Constructable<any>, ScopingFunction<any>>([]);
