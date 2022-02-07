import Mongoose from 'mongoose';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const accountSchema = new Mongoose.Schema(
  {
    group: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['root', 'staff', 'user']
    },
    accessId: {
      type: String,
      default: crypto
        .createHash('sha256')
        .update(`${uuidv4()}${new Date().getTime()}`)
        .digest('hex'),
      unique: true
    },
    privileges: [
      {
        privilegeId: {
          type: String,
          required: true
        },
        resourceId: {
          type: String,
          required: true
        },
        read: {
          type: Boolean,
          required: true,
          default: true
        },
        create: {
          type: Boolean,
          required: true,
          default: true
        },
        update: {
          type: Boolean,
          required: true,
          default: true
        }
      }
    ],
    email: {
      type: String,
      requred: true,
      unique: true
    },
    alternateEmail: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    alternatePhone: {
      type: String,
      required: false
    },
    hashed_password: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: false
    },
    isMFA: {
      type: Boolean,
      required: false,
      default: false
    },
    securityParaphrase: {
      type: String,
      required: true
    },
    activeSessionDevices: [
      {
        device: {
          type: String,
          required: true,
          enum: ['mobile', 'tablet', 'laptop', 'tv']
        }
      }
    ],
    isPremium: {
      type: Boolean,
      required: false,
      default: true
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  {
    timestamps: true,
    strict: false
  }
);

accountSchema
  .virtual('password')
  .set(function (this: any, password: string) {
    this._password = password;
    this.salt = uuidv4();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function (this: any) {
    return this._password;
  });

accountSchema.methods = {
  auth: function (plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password: string) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (error) {
      return '';
    }
  }
};

accountSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.hashed_password;
  delete obj.salt;
  delete obj.__v;
  return obj;
};

const AccountModel = Mongoose.model('account', accountSchema);
export default AccountModel;
