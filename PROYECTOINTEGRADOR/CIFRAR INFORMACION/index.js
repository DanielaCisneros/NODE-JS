/*var Agenda = require('agenda');
var mongoConnectionString = 'localhost:27017/jobs';

var agenda = new Agenda({db: {address: mongoConnectionString}});

agenda.define('sendNewsletter', function(job) {
  console.log("Sending newsletter. Time: " +
  new Date().getMinutes() + ":" + new Date().getSeconds());
});

agenda.on('ready', function() {
  agenda.every('3 seconds', 'sendNewsletter');
  agenda.start(); 
});*/

var cron = require('node-cron');

cron.schedule('* 01 * * * SUN', () => {
  console.log('running a task every second');
});