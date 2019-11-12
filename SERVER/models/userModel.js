import Userhelper from '../helper/userHelp';
const Helper = new Userhelper();
class Userschema {
  constructor(userData) {
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.email = userData.email;
    this.phone = userData.phoneNumber;
    this.userName = userData.userName,
    this.password = userData.password;
    this.status = false
  }

  displayUser() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phoneNumber,
      userName: this.userName,
    };
  }
}

export default Userschema;
