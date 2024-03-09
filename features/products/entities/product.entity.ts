import { DomainError } from '@infrastructure/errors/domain.error';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity({ name: 'products' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Product {
  // Private fields, containing the state of the entity
  // These fields are only accessible from within the class and its subclasses
  @PrimaryGeneratedColumn({ name: 'id' })
  protected _id: number;

  @Column({ name: 'name', type: 'text' })
  protected _name: string;

  @Column({ name: 'description', type: 'text' })
  protected _description: string;

  @Column({ name: 'price', type: 'decimal' })
  protected _price: number;

  @Column({ name: 'created_at', type: 'timestamp' })
  protected _createdAt: Date;

  @Column({ name: 'last_modified_at', type: 'timestamp' })
  protected _lastModifiedAt: Date;

  // No setter for id, because it is set automatically when the product is stored by the ORM
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (!value || value.trim().length === 0) {
      throw new DomainError('Name of product is required');
    }

    value = value.trim();

    if (value === this._name) {
      return;
    }

    this._name = value;
    this._lastModifiedAt = new Date();
  }

  get description(): string {
    return this._description ?? null;
  }

  set description(value: string) {
    if (value) {
      value = value.trim();
    }

    if (value === this._description) {
      return;
    }

    this._description = value;
    this._lastModifiedAt = new Date();
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    if (!value) {
      throw new DomainError('Price of product is required');
    }

    if (value <= 0) {
      throw new DomainError(
        'Price of product must be greater than or equal to zero',
      );
    }

    if (value === this._price) {
      return;
    }

    this._price = value;
    this._lastModifiedAt = new Date();
  }

  // No setter for createdAt, because it is set automatically when the product is created
  get createdAt(): Date {
    return this._createdAt;
  }

  // No setter for lastModifiedAt, because it is set automatically when any set accessor is called
  get lastModifiedAt(): Date {
    return this._lastModifiedAt;
  }
}
