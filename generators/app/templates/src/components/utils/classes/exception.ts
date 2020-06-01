import { badData } from 'boom';

export class Exception extends Error {
  
  constructor(boomError: any) {
    super(boomError.message)
  }
}