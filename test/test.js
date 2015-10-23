var assert = require("chai").assert; // node.js core module

describe('slack',function(){

    var seneca = require('seneca')();
    seneca.use('..');

    describe('webhook',function(){
        it('should send a message using an slack webhook',function(done){
            this.timeout(3000);
            var req =  {lpn:'slack', cmd:'webhook', config:{
                    webhook:{name:"Test Webhook",uri:"https://hooks.slack.com/services/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"},
                    text:"this is a test notification!",
                    username:'jico'
            }};

            seneca.act(req, function(err,result){
                assert.isNull(err);
                assert.equal(result.status,"sent");
                done();
            });
        })
    });

    describe('about',function(){
        it('should return notification properties',function(done){
            seneca.act( {lpn:'slack', cmd:'about'}, function(err,result){
                console.log( '%j', result );
                assert.isObject(result,'result is an object');
                assert.equal(result.name,'slack','name is slack');
                done();
            });
        })
    });


    describe('list',function(){
        it('should return a command\'s json schema',function(done){
            seneca.act({lpn:'slack',cmd:'list'}, function(err,list){
                console.log('%j',list);
                assert.isObject(list,'list is object');
                done();
            });
        });
    });
});