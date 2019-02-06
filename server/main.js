import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish(null, function () {
    return Meteor.users.find({_id: this.userId}, {fields: {memberType: 1, contract:1}});
  });

  Meteor.methods({
    'createNewUser': function(username, email, password) {
      Accounts.createUser({username: username, email: email, password: password});
    },
    'forgotPwd': function(email) {
      Accounts.forgotPassword({email: email});
    },
    'changeUsername': function(newUsername, email) {
      Accounts.sendVerificationEmail(this.userId, email);
      Accounts.setUsername(this.userId, newUsername);
      return true;
    },
    'changeEmail': function(currentEmail, newEmail) {
      //Accounts.sendVerificationEmail(this.userId, currentEmail);
      Accounts.removeEmail(this.userId, currentEmail);
      Accounts.addEmail(this.userId, newEmail);
      return true;
    },
    'changeMemberType': function(type) {
      Meteor.users.update({_id: this.userId}, {$set: {'memberType': type}});
      return true;
    },
    'changeContractDates': function(start, end) {
      Meteor.users.update({_id: this.userId}, {$set: {contract: {'start': start, 'end': end}}});
      return true;
    }
  });
  //https://docs.meteor.com/api/passwords.html#Accounts-sendResetPasswordEmail
  //set up some sort of email verificationsystem
});
