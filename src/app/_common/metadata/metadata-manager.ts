/* eslint-disable @typescript-eslint/no-explicit-any */
import { NonEmptyArray } from '@common/base-types/non-empty-array.type';

export class MetadataManager<TMetadata extends Record<string | symbol, any>> {
  private readonly classMetadataManagers = new Map<Function, ClassMetadataManager<TMetadata>>();
  /**
   * All classes with metadata set for given keyof TMetadata or having properties with metadata set for it.
   */
  private readonly typesMetadata = new Map<keyof TMetadata, Set<Function>>();

  public fetchClassMetadata<TType extends keyof TMetadata>(klass: Function, type: TType): TMetadata[TType] {
    const metadata = this.getClassMetadata(klass, type);
    if (metadata) return metadata;
    throw new Error(`Metadata of type '${type.toString()}' not found for '${klass.name}' class.`);
  }

  public getClassMetadata<TType extends keyof TMetadata>(klass: Function, type: TType): TMetadata[TType] | undefined {
    return this.classMetadataManagers.get(klass)?.getClassMetadata(type);
  }

  public setClassMetadata<TType extends keyof TMetadata>(klass: Function, type: TType, metadata: TMetadata[TType]): void {
    this.updateClassMetadata(klass, type, metadata);
    this.updateTypesMetadata(klass, type);
  }

  private updateClassMetadata<TType extends keyof TMetadata>(klass: Function, type: TType, metadata: TMetadata[TType]): void {
    this.getOrSetClassMetadataManager(klass).setClassMetadata(type, metadata);
  }

  private getOrSetClassMetadataManager(klass: Function): ClassMetadataManager<TMetadata> {
    const existingManager = this.classMetadataManagers.get(klass);
    if (existingManager) return existingManager;

    const manager = new ClassMetadataManager<TMetadata>();
    this.classMetadataManagers.set(klass, manager);
    return manager;
  }

  private updateTypesMetadata(klass: Function, type: keyof TMetadata): void {
    const klassesSet = this.typesMetadata.get(type);
    if (klassesSet) {
      klassesSet.add(klass);
    } else {
      this.typesMetadata.set(type, new Set<Function>([klass]));
    }
  }

  public fetchPropertyMetadata<TType extends keyof TMetadata>(klass: Function, propertyKey: PropertyKey, type: TType): NonEmptyArray<TMetadata[TType]> {
    const metadata = this.getPropertyMetadata(klass, propertyKey, type);
    if (metadata) return metadata;
    throw new Error(`Metadata of type '${type.toString()}' not found for '${propertyKey.toString()}' key on '${klass.name}' class.`);
  }

  public getPropertyMetadata<TType extends keyof TMetadata>(
    klass: Function,
    propertyKey: PropertyKey,
    type: TType
  ): NonEmptyArray<TMetadata[TType]> | undefined {
    return this.getOrSetClassMetadataManager(klass).getPropertyMetadata(propertyKey, type);
  }

  public setPropertyMetadata<TType extends keyof TMetadata>(klass: Function, propertyKey: PropertyKey, type: TType, metadata: TMetadata[TType]): void {
    this.getOrSetClassMetadataManager(klass).setPropertyMetadata(propertyKey, type, metadata);
    this.updateTypesMetadata(klass, type);
  }

  public getClassesWithMetadataType(type: keyof TMetadata): Function[] {
    const classesSet = this.typesMetadata.get(type);
    if (classesSet) return Array.from(classesSet.values());
    return [];
  }

  public getClassPropertiesWithMetadataType(klass: Function, type: keyof TMetadata): PropertyKey[] {
    return this.getOrSetClassMetadataManager(klass).getPropertiesWithMetadataType(type) ?? [];
  }
}

class ClassMetadataManager<TMetadata extends Record<string | symbol, any>> {
  private readonly classMetadata = new Map<keyof TMetadata, TMetadata[keyof TMetadata]>();
  private readonly propertiesMetadata = new Map<PropertyKey, Map<keyof TMetadata, NonEmptyArray<TMetadata[keyof TMetadata]>>>();
  /**
   * All class properties with medatada set for given keyof TMetadata.
   */
  private readonly typesMetadata = new Map<keyof TMetadata, Set<PropertyKey>>();

  public getClassMetadata<TType extends keyof TMetadata>(type: TType): TMetadata[TType] | undefined {
    return this.classMetadata.get(type);
  }

  public setClassMetadata<TType extends keyof TMetadata>(type: TType, metadata: TMetadata[TType]): void {
    this.classMetadata.set(type, metadata);
  }

  public getPropertyMetadata<TType extends keyof TMetadata>(propertyKey: PropertyKey, type: TType): NonEmptyArray<TMetadata[TType]> | undefined {
    return <NonEmptyArray<TMetadata[TType]> | undefined>this.propertiesMetadata.get(propertyKey)?.get(type);
  }

  public setPropertyMetadata<TType extends keyof TMetadata>(propertyKey: PropertyKey, type: TType, metadata: TMetadata[TType]): void {
    this.updatePropertyMetadata(propertyKey, type, metadata);
    this.updateTypesMetadata(propertyKey, type);
  }

  private updatePropertyMetadata<TType extends keyof TMetadata>(propertyKey: PropertyKey, type: TType, metadata: TMetadata[TType]): void {
    const metadataMap = this.propertiesMetadata.get(propertyKey);
    if (metadataMap) {
      const existingMetadata = metadataMap.get(type);
      if (existingMetadata) {
        existingMetadata.push(metadata);
      } else {
        metadataMap.set(type, [metadata]);
      }
    } else {
      this.propertiesMetadata.set(propertyKey, new Map<keyof TMetadata, NonEmptyArray<TMetadata[keyof TMetadata]>>([[type, [metadata]]]));
    }
  }

  private updateTypesMetadata(propertyKey: PropertyKey, type: keyof TMetadata): void {
    const propertiesSet = this.typesMetadata.get(type);
    if (propertiesSet) {
      propertiesSet.add(propertyKey);
    } else {
      this.typesMetadata.set(type, new Set<PropertyKey>([propertyKey]));
    }
  }

  public getPropertiesWithMetadataType(type: keyof TMetadata): PropertyKey[] {
    const propertiesSet = this.typesMetadata.get(type);
    if (propertiesSet) return Array.from(propertiesSet.values());
    return [];
  }
}
