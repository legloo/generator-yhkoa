import * as crypto from 'crypto'
import * as mongoose from 'mongoose'
// import { Schema } from 'mongoose'
import * as config from '../../config'

const authTypes = Object.keys(config.auth.providers)

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: function () {
      if (!this.providers || !this.providers.length) {
        return true
      } else {
        return false
      }
    }
  },
  password: {
    type: String,
    required: function () {
      if (!this.providers || !this.providers.length) {
        return true
      } else {
        return false
      }
    }
  },
  roles: [{
    type: String
  }],
  datetime: {
    type: Date,
    default: Date.now
  },
  providers: [{
    name: {
      type: String,
      enum: authTypes
    },
    openid: String
  }],
  salt: String,
  nickname: String,
  age: Number,
  gender: {
    type: String,
    enum: ['m', 'f'],
    default: 'm'
  },
  avatar: {
    type: String
  },
  city: {
    type: String
  },
  province: {
    type: String
  },
  country: {
    type: String
  },
}, <any>{
  collection: 'users',
  discriminatorKey: '_model'
})

AuthSchema['options'].toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.salt;
    return ret;
  }
}

// /**
//  * Validations
//  */

// Validate empty username
AuthSchema
  .path('username')
  .validate(function (username) {
    if (this.providers && this.providers.length) {
      return true
    }
    return username.length
  }, 'Username cannot be blank')

// Validate empty password
AuthSchema
  .path('password')
  .validate(function (password) {
    if (this.providers && this.providers.length) {
      return true
    }
    return password.length
  }, 'Password cannot be blank')

// Validate username is not taken


AuthSchema.path('username').validate({
  validator: async function (value) {
    let user = await this.constructor.findOne({ username: value }).exec();
    if (user) {
      return false
    };
    return true
  },
  message: '名称已被注册!'
});

/**
 * Pre-save hook
 */

function validatePresenceOf(value) {
  return value && value.length
}

AuthSchema.pre('save', async function (this: any, next) {
  // Handle new/update passwords
  if (!this.isModified('password')) {
    return next()
  }
  if (!validatePresenceOf(this.password)) {
    if (!this.providers || !this.providers.length) {
      return next(new Error('Invalid password'))
    } else {
      return next()
    }
  }

  // Make salt
  try {
    let salt = await this.makeSalt();
    this.salt = salt
    let hashedPassword = await this.encryptPassword(this.password);
    this.password = hashedPassword
    next()
  } catch (e) {
    next(e);
  }
})

/**
 * Methods
 */
AuthSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} password
   * @return {Boolean}
   * @api public
   */
  async authenticate(password): Promise<boolean> {
    let pwdGen = await this.encryptPassword(password);
    return this.password === pwdGen;
  },

  /**
   * Make salt
   *
   * @param {Number} byteSize Optional salt byte size, default to 16
   * @return {String}
   * @api public
   */
  makeSalt(byteSize: number = 16): Promise<any> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(byteSize, (err, salt) => {
        if (err) {
          reject(err)
        } else {
          resolve(salt.toString('base64'))
        }
      })
    })
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword(password): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!password || !this.salt) {
        reject(new Error('Missing password or salt'));
      }
      let defaultIterations = 10000
      let defaultKeyLength = 64
      let salt = Buffer.from(this.salt, 'base64')
      return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha256', (err, key) => {
        if (err) {
          reject(err)
        } else {
          resolve(key.toString('base64'))
        }
      });
    });

  }
}


export default mongoose.model('User', AuthSchema)