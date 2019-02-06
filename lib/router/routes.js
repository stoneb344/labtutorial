import { Router, RouteController } from 'meteor/iron:router';
import '../client/main.html';
import '../client/bash.html'
import '../client/about.html'

Router.configure({
  layoutTemplate: 'background',
});
Router.route('/', function () {
  this.render('home');
});
Router.route('/bash', function () {
  this.render('bash');
  $('.background-contents').hide().fadeIn("slow");
});
Router.route('about', function() {
  this.render('about');
});

/*
Router.route('/', function () {
  this.render('home', {
    data: function () { return Items.findOne({_id: this.params._id}); }
  });
});
*/
