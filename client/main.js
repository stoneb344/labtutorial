import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Accounts } from 'meteor/accounts-base';
//import { Lessons } from '../lib/collections.js';
import 'materialize-css';
import './views/main.html';
import './views/home.html';
import './views/login.html';
import './views/create.html';
import './views/forgot.html';
import './views/profile.html';
import './views/about.html';
import './views/technology.html';
import './views/bash.html';
import './views/basics.html';
import './views/languages.html';
import './views/libraries.html';


Template.home.onRendered(function () {
  $('.background-contents').hide().fadeIn('slow');
  //To initialize the dropdown in the navbar
  $('.dropdown-trigger').dropdown({
    constrainWidth: true,
    hover: true,
    onOpenStart: () => {
      // the elements the dropdown should be on top of.
      $('.card').css('z-index',-1)
      $('.chip').css('z-index', -1)
      $('.postImage').css('z-index', -1)
      $('.parallax-container').css('z-index', -1)
      $('.collection').css('z-index', -1)
    },
    onCloseStart: () => {
      // return the elements to their first state so the user can interact with them
      $('.card').css('z-index', 1)
      $('.card-title').css('z-index', 1)
      $('.postImage').css('z-index', 1)
      $('.parallax-container').css('z-index', 1)
      $('.collection').css('z-index', 1)
    }
  });
});



Template.navbar.helpers({
  'username': function () {
    return Meteor.users.findOne({ _id: Meteor.userId() }).username;
  }
});

Template.navbar.events({
  'click #logout' (event, instance) {
    Meteor.logout();
    $('#home').trigger('click');
  }
});



Template.login.onRendered(function () {
  $('#login-sign-in-link').trigger('click');
});



Template.create.events({
  'click #create-btn' (event, instance) {
    var username = $('#set-username').val();
    var email = $('#set-email').val();
    var password = $('#set-password').val();
    var confirmPwd = $('#confirm-password').val();

    if (password === confirmPwd) {
      Meteor.call('createNewUser', username, email, password);
      alert('To finish signing up, please use the verification link sent to the'
        + 'email you provided');
      $('#home').trigger('click');
    } else {
      alert('Passwords do not match!');
    }
  }
});



Template.forgot.events({
  'click #forgot-btn' (event, instance) {
    var email = $('#forgot-email').val();
    //add an if statement to check if this email exists
    //if (Meteor.users.findOne({"emails.0.address": "stonebh@dukes.jmu.edu"}) === undefined)
      Meteor.call('forgotPwd', email);
      alert('An email has been sent. Please use the included verification link'
        + 'to reset your password.');
    //}
    //add an if statement to check if this email exists
  }
});



function resizeTextArea() {
  if ($(window).width() < 993) {
    $('.tech-bg').css('margin-right', '0px'); //if TOC is gone, (white) BG should take up more room
  }
  else {
    $('.tech-bg').css('margin-right', '260px'); //if TOC is present
  }
}

function render() {
  $('.background-contents').hide().fadeIn('slow');
  //Will resize the (white) background to take up more space if the TOC is gone
  resizeTextArea();
  $(window).resize(function () {
    resizeTextArea();
  });
}

Template.bash.onRendered(function () {
  render();
});

Template.basics.onRendered(function () {
  render();
  $('#100-loop').hide();
  $('#err1').hide();
  $('#err1-output').hide();
  $('#almost').hide();
  $('#almost-with-markup').hide();
  $('#fb-simple').hide();
  $('#fb-elegant').hide();
  $('#array-problem').hide();
  $('#guess-part1').hide();
  $('#guess-part2').hide();
});

Template.basics.events({
  'click #100-loop-btn' (event, instance) {
    $('#100-loop').slideToggle('slow');
  },
  'click #err1-btn' (event, instance) {
    $('#err1').slideToggle('slow');
    $('#err1-output').slideToggle('slow');
  },
  'click #almost-btn' (event, instance) {
    $('#almost').slideToggle('slow');
  },
  'click #almost-with-markup-btn' (event, instance) {
    $('#almost-with-markup').slideToggle('slow');
  },
  'click #fb-simple-btn' (event, instance) {
    $('#fb-simple').slideToggle('slow');
  },
  'click #fb-elegant-btn' (event, instance) {
    $('#fb-elegant').slideToggle('slow');
  },
  'click #array-problem-btn' (event, instance) {
    $('#array-problem').slideToggle('slow');
  },
  'click #guess-part1-btn' (event, instance) {
    $('#guess-part1').slideToggle('slow');
  },
  'click #guess-part2-btn' (event, instance) {
    $('#guess-part2').slideToggle('slow');
  }
});

Template.languages.onRendered(function () {
  render();
});

Template.libraries.onRendered(function () {
  render();
});





///////////////SET LOGIN OPTIONS///////////////
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});
/*
Accounts.emailTemplates({
  from: 'no-reply@labtut.org',
  /*enrollAccount: {

  },
  resetPassword: {

  },
  verifyEmail: {
    from: 'no-reply@labtut.org',
    subject: 'LabTut: Confirm Request to Change Username',
    text: 'A request has been issued to to change your username.'
  }
});
AccountsTemplates.addFields([
  {
    _id: 'firstName',
    type: 'text',
    displayName: 'First Name',
    required: true,
    re: /(?=.*[a-z])(?=.*[A-Z])/,
    errStr: '1 lowercase and 1 uppercase letter required'
  },
  {
    _id: 'lastName',
    type: 'text',
    displayName: 'Last Name',
    required: true,
    re: /(?=.*[a-z])(?=.*[A-Z])/,
    errStr: '1 lowercase and 1 uppercase letter required'
  }
]); */
///////////////////////////////////////////////



Template.profile.onRendered(function () {
  $('.background-contents').hide().fadeIn('slow');
  $('.collapsible').collapsible();
  $('.account-input').click(function() {
    $(this).css("border-bottom-color", "white")
  });
  $('.account-input').blur(function() {
    $('.account-input').css("border-bottom-color", "")
  });

  if($('#member').html() === '  &nbsp; ') {
    $('#member').html('N/A')
  }
  if($('#contract').html() === '  -  &nbsp; ') {
    $('#contract').html('N/A')
  }
});



Template.editAccount.onRendered (function() {
  $('select').formSelect();
  $('.datepicker').datepicker({autoClose: true,
    format: 'mm/dd/yyyy'});
  $('.date-text')
  $('.editable').hide();
});



Template.accountInfo.helpers({
  'username': function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).username;
  },
  'email': function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address;
  },
  'memberType': function () {
    return Meteor.users.findOne({_id: Meteor.userId()}).memberType;
  },
  'startDate': function () {
    var startDate = Meteor.users.findOne({_id: Meteor.userId()}).contract.start;
    var formattedDate = startDate.substring(0, 3) + "." + startDate.substring(3, startDate.length);
    return formattedDate;
  },
  'endDate': function () {
    var endDate = Meteor.users.findOne({_id: Meteor.userId()}).contract.end;
    var formattedDate = endDate.substring(0, 3) + "." + endDate.substring(3, endDate.length);
    return formattedDate;
  }
});

Template.editAccount.events ({
  'click #info-btn' (event, instance) {
    var newUsername = $('#edit-username').val();
    var newEmail = $('#edit-email').val();
    var currentEmail = Meteor.users.findOne({ _id: Meteor.userId() }).emails[0].address;
    var member = $('#edit-member').val();
    var startDate = $('#start-date').val();
    var endDate = $('#end-date').val();


    if (newUsername !== '') {
      //console.log("currentEmail", currentEmail);
      Meteor.call('changeUsername', newUsername, currentEmail);
    }
    if (newEmail !== '') {
      Meteor.call('changeEmail', currentEmail, newEmail);
    }
    if (member !== '' && member !== null) {
      //console.log('member', member);
      Meteor.call('changeMemberType', member);
    }
    if (startDate !== "" || endDate !== "") {
      if (startDate === "") {
        startDate = Meteor.users.findOne({_id: Meteor.userId()}).contract.startDate;
        Meteor.call('changeContractDates', startDate, endDate);
        //console.log('1');
      } else if (endDate === "") {
        endDate = Meteor.users.findOne({_id: Meteor.userId()}).contract.endDate;
        Meteor.call('changeContractDates', startDate, endDate);
      //console.log('2');
      } else {
        Meteor.call('changeContractDates', startDate, endDate);
        //console.log('3');
      }
    }
  }
});



Template.lessonPlanProgress.events({
  'click .lesson-plan' (event, instance) {
    console.log("event:", event);
    console.log("event.target:", event.target);
    console.log("event.target.nextSibling:", event.target.nextSibling);

    if ($('.lesson-plan').is(':checked')) {
      console.log('1');
      //console.log(document.getElementsByClassName('lesson-plan'));
      $(event.target).each(function() {
        window.getComputedStyle(this,':before').content.style.backgroundColor = 'white';
      });
    } else {
      console.log('2');
    }
  }
});



Template.resetPassword.events({
  'mouseover #reset-btn' (event, instance) {
    var oldPwd = $('#old-password').val();
    var newPwd = $('#new-password').val();
    var retypePwd = $('#retype-password').val();

    if (oldPwd === '' || newPwd === '' || retypePwd === '' || newPwd !== retypePwd) {
      $('#reset-btn').addClass('btn-disabled');
    } else {
      $('#reset-btn').removeClass('btn-disabled');
    }
  },
  'click #reset-btn' (event, instance) {
    var oldPwd = $('#old-password').val();
    var newPwd = $('#new-password').val();
    var retypePwd = $('#retype-password').val();

    //Ensures that no field is left blank
    if (oldPwd === '') {
      //resetBtn.addClass('btn-red');
      alert('Please enter your current password.');
      return;
    } else if (newPwd === ''){
      //resetBtn.addClass('btn-red');
      alert('Please provide a new password.');
      return;
    } else if (retypePwd === ''){
      //resetBtn.addClass('btn-red');
      alert('Please enter the new password again.');
      return;
    }

    //Changes the password assuming all conditions are met
    if (newPwd === retypePwd) {
      Accounts.changePassword(oldPwd, newPwd, error => {
        if (error) { //If current password is wrong
          console.log('error:', error)
          alert('Current password is incorrect!');
        } else {  //If everything goes accordingly
          alert('Success! Your new password is: ' + newPwd);
        }
      });
    } else { //If the the new passwords do not match
      alert('Passwords do not match!');
    }
  },
});



//////////////////ROUTING///////////////////////
Router.configure({
  layoutTemplate: 'background',
});
Router.route('/', function () {
  this.render('home');
});

Router.route('/login', function () {
  this.render('login');
})

Router.route('/login/createaccount', function () {
  this.render('create');
});

Router.route('/login/forgotpassword', function () {
  this.render('forgot');
});

Router.route('/profile', function () {
  this.render('profile');
});

Router.route('/about', function () {
  this.render('about');
});

Router.route('/technology', function () {
  this.render('technology');
});

Router.route('/technology/bash', function () {
  this.render('bash');
});

Router.route('/technology/basics', function () {
  this.render('basics');
});

Router.route('/technology/languages', function () {
  this.render('languages');
});

Router.route('/technology/libraries', function () {
  this.render('libraries');
});
