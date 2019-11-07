import UserHelper from '../helper/userHelp';

class Userschema {
  constructor(userData) {
    this.id = new Date();
    this.firstName = userData.firstName;
    this.lastName = userData.lastName;
    this.email = userData.email;
    this.phoneNumber = userData.phoneNumber;
    this.password = UserHelper(userData.password);
  }

  displayUser() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
    };
  }
}

export { Userschema as default };
