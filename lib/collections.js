import { Mongo } from 'meteor/mongo';
/*
Meteor.startup(function () {

});
*/
export const Lessons = new Mongo.Collection('lessons');
