import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import dotenv from 'dotenv';


dotenv.config();
class UserHelper {
  static async generateToken(userInfo) {
    const Token = await jwt.sign(
      { id: userInfo.id, email: userInfo.email, isAdmin: userInfo.isAdmin },
      process.env.SECRET_KEY, { expiresIn: '2d' },
    );
    return Token;
  }

  static async hashPassword(userPassword) {
    const hashedPassowrd = await bcrypt.hash(userPassword, 10);
    return hashedPassowrd;
  }

  static async comparePassword(userPassword, hashedPassword) {
    const compare = await bcrypt.compare(userPassword, hashedPassword);
    return compare;
  }

  static signInUserValidation(body) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    };
    return Joi.validate(body, schema);
  }

  static validateForgotEmail(body) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    };
    return Joi.validate(body, schema);
  }

  static signUpUserValidation(body) {
    const schema = {
      firstName: Joi.string().min(4).required(),
      lastName: Joi.string().min(4).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phoneNumber: Joi.string().min(10).max(13).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    };
    return Joi.validate(body, schema);
  }
}

export { UserHelper as default };
