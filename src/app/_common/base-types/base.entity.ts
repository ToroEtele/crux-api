export abstract class BaseEntity {
  public abstract readonly id: number | string;
}

export interface IEntity {
  id?: number | string;
}
