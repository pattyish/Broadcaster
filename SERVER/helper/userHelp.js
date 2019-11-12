import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import dotenv from 'dotenv';


dotenv.config();
class Userhelper {
  generateToken(userInfo) {
    const Token = jwt.sign(
      { id: userInfo.id, email: userInfo.email, isAdmin: userInfo.isAdmin },
      process.env.SECRET_KEY, { expiresIn: '2d' },
    );
    return Token;
  }

  async hashPassword(userPassword) {
    return  bcrypt.hashSync(userPassword, 10);
  }

  comparePassword(userPassword, hashedPassword) {
    return bcrypt.compareSync(userPassword, hashedPassword); 
  }

  signInUserValidation(body) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    };
    return Joi.validate(body, schema);
  }

  validateForgotEmail(usercredentail) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    };
    return Joi.validate(body, schema);
  }

  signUpUserValidation(body){
    const schema = {
      // id: Joi.string(),
      firstName: Joi.string().min(4).required(),
      lastName: Joi.string().min(4).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      phoneNumber: Joi.string().min(10).max(13).required(),
      userName: Joi.string().min(5).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
      status: Joi.boolean(),
    };
    return Joi.validate(body, schema);
  }
}

export default Userhelper;
