import Helper from '../helper/userHelp';
import Userschema from '../models/userModel';
import DbOperation from '../models/dbOperation';

const DbQuery = new DbOperation('Users');
class UserController {
  async userSignUP(req, res) {
    const { body } = req.body;
    const { error } = await Helper.signUpUserValidation(body);
    if (error) return res.status(404).json({ status: 404, message: error.details[0].message });
    const isEmailExist = await DbQuery.selectByField('email', body.email);
    if (isEmailExist) return res.status(401).json({ status: 401, message: ` this ${body.email} is already exisst ` });
    const newUser = new Userschema(body);
    const saveUser = await DbQuery.insertData(newUser);
    if (!saveUser) return res.status(500).json({ status: 500, message: 'database operation fail' });
    const Token = Helper.generateToken(newUser);
    return res.status(201).json({ status: 201, message: 'user created successful', data: { newUser, Token } });
  }

  async userSignIn(req, res) {
    const { userCredential } = req.body;
    const { error } = await Helper.signInUserValidation(userCredential);
    if (error) return res.status(404).json({ status: 404, message: error.details[0].message });
    const isEmailExist = await DbQuery.selectByField('email', userCredential.email);
    if (!isEmailExist) return res.status(401).json({ status: 401, message: ` this ${userCredential.email} is not registered, use correct email ` });
    const checkPassword = await Helper.comparePassword(userCredential.password, isEmailExist.row.password);
    if (!checkPassword) return res.status(401).json({ status: 401, message: 'password is incorrect' });
    const Token = Helper.generateToken(isEmailExist.row);
    return res.status(201).json({ status: 201, message: 'user login successful', data: { Token } });
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
