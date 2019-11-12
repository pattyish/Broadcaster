import Userschema from '../models/userModel';
import Userhelper from '../helper/userHelp';
import DbOperation from '../models/dbOperation';

const Helper = new Userhelper();
const DbQuery = new DbOperation('users');
class UserController {
  async userSignUp(req, res) {
    try {
      const { body } = req;
      const { error } = await Helper.signUpUserValidation(body);
      if (error) return res.status(404).json({ status: 404, message: error.details[0].message });
      const isEmailExist = await DbQuery.selectByField('email', body.email);
      if (isEmailExist.count > 0) return res.status(404).json({ status: 404, message: ` this ${body.email} is already exisst ` });
      body.password = await Helper.hashPassword(body.password);
      const newUser = new Userschema(body);
      const saveUser = await DbQuery.insertData(newUser);
      if (!saveUser) return res.status(500).json({ status: 500, message: 'database operation fail' });
      const Token = await Helper.generateToken(newUser);
      return res.status(201).json({ status: 201, message: 'user created successful', data: { newUser, Token } });
    }catch(error){
      console.log(error);
   }
  }

  async userSignIn(req, res) {
     try {
    const { body } = req;
    const { error } = await Helper.signInUserValidation(body);
    if (error) return res.status(404).json({ status: 404, message: error.details[0].message });
    const checkEmail = await DbQuery.selectByField('email', body.email);
    if (checkEmail.count < 0) return res.status(401).json({ status: 401, message: ` this ${body.email} is not registered, use correct email ` });
    const checkPassword = await Helper.comparePassword(body.password, checkEmail.row.password);
    if (!checkPassword) return res.status(401).json({ status: 401, message: 'password is incorrect' });
    const Token = await Helper.generateToken(checkEmail.row);
    return res.status(200).json({ status: 200, message: 'user login successful', data: { Token } });
    } catch(error){
      console.log(`error on sign up ${error}`);
       return error;
   }
    
  }

  async forgotPassword(req, res) {
    const { userEmail } = req.body;
    const { error } = await Helper.validateForgotEmail(userEmail);
    if (error) return res.status(404).json({ status: 404, message: error.details[0].message });
    const isEmailExist = await DbQuery.selectByField('email', userEmail.email);
    if (!isEmailExist) return res.status(401).json({ status: 401, message: ` we do not found this ${userEmail.email}` });
  }
}

export { UserController as default };
