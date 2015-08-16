var config = require('./config');
var schemas = require('./commands');
var Slack = require('slack-node');
var _ = require('underscore');

var service = {
    "name": "slack",
    "label": "Slack",
    "description": "Slack notification",
    "private": true,
    "form_options": null,
    "is_oauth": false,
    "logo": "//linchpin-web-assets.s3.amazonaws.com/v1/notifications/slack/slack-logo.png",
    "server_notification": true
};

module.exports = function(options) {
    var lpns = this;

    lpns.add({lpn:'slack',cmd:'about'},about);
    lpns.add({lpn:'slack',cmd:'list'},list);

    lpns.add({lpn:'slack',cmd:'webhook'},webhook);
    lpns.add({lpn:'slack',cmd:'rateLimitExceeded'},rateLimitExceeded);

    return {
        name:'slack'
    };


    function webhook(args, done){
        webhookUri = args.config.slack_webhook.uri;

        slack = new Slack();
        slack.setWebhook(webhookUri);


        var msg = _.extend({}, _.omit(args.config,'slack_webhook'));

        slack.webhook(msg, function(err, response) {
            if(err){
                console.error(err);
                done(new Error('Error sending message to Slack'));
            } else {
                done(null,{status:"sent",response:response});
            }
        });
    }

    function rateLimitExceeded(args, done){
        // do nothing!
    }


    function about (args, done ){
        return done(null,service);
    }

    function list (args, done){
        return done(null, schemas);
    }
};

