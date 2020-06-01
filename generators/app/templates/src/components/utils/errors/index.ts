import Boom = require('boom');


const Errors = [
  {
    code: 400,
    b(m:string) {
     return Boom.badRequest(m)
    },
    types: ['CastError']
  },
  {
    code: 401,
    b(m:string) {
      return Boom.unauthorized(m)
    },
    types: ['AuthError', 'UnauthorizedError']
  },
  {
    code: 403,
    b(m:string) {
      return Boom.forbidden(m)
    },
    types: ['PermissonError']
  },
  {
    code: 404,
    b(m:string) {
      return Boom.notFound(m)
    },
    types: ['EntityNotFoundError']
  },
  {
    code: 422,
    b(m:string) {
      return Boom.badData(m)
    },
    types: ['ValidationError', 'SyntaxError', 'FileUploadError', 'WechatError', 'ImageProcessError']
  }
]

export function getErrorStatus(error: Error) {
  for (let Error of Errors) {
    if (!!~Error.types.indexOf(error.name)) {
      let a = Error.b
      let c = a(error.message);
      return c
  }
}
}
export function getErrorStatusCode(error: Error) {
  for (let Error of Errors) {
    if (!!~Error.types.indexOf(error.name)) {
      return Error.code
    }
  }
  return 500
}

export class EntityNotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Entity not found')
    this.name = 'EntityNotFoundError'
  }
}

export class AuthError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export class PermissonError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'PermissonError'
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export class FileUploadError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'FileUploadError'
  }
}

export class WechatError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'WechatError'
  }
}

export class ImageProcessError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'ImageProcessError'
  }
}
