import { Document } from 'mongoose';
import { EntityNotFoundError } from '../'

export function validateEntity(entity: Document): void {
  if (!entity) {
    throw new EntityNotFoundError()
  }
}