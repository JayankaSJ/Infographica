var express = require('express');
var app = express();
var router = express.Router();

require('../models/post');
require('../models/tab');
var mongoose = require('mongoose');
var Post = mongoose.model("post");
var Tab = mongoose.model("tab");

router.post('/tab', function(req, res, next) {
    var data = req.body;
    switch(data.command){
        case 0:
            Tab.find({}, function(error, tabs) {
                if (error){
                    res.json(error);
                }
                res.json(tabs);
            });
            break;
        case 1:
            var tab = new Tab(req.body);
            tab.save(function(error, tab){
                if(error){
                    res.json(tab);
                    return;
                }
                res.json(error);
            });
            break;
        default:
            res.json(200);
    }
    
});

router.post('/post', function(req, res, next) {
    var data = req.body;
    switch(data.command){
        case 1:
            Tab.findById(data.tab, function(error, tab) {
                if (error){ 
                    res.json(error);
                    return;
                }
                res.json(tab);
            });
            break;
        case 2:
            Post.findById(data.post, function(error, post) {
                if (error){ 
                    res.json(error);
                    return;
                }
                res.json(post);
            });
            break;
        default:
            res.json(200);
    }
});

router.post('/image', function(req, res, next) {
    switch(req.body.command){
        case 1:
            var post = new Post(req.body.data);
            post.save(function(error, post) {
                if (error){ 
                    res.json(error);
                    return;
                }
                Tab.findById(req.body.data.tab, function(error, tab) {
                    if (error){ 
                        res.json(error);
                        return;
                    }
                    console.log("tab: " + tab._id);
                    tab.posts.push(post._id);
                    tab.save(function(error){
                        if (error){ 
                            res.json(error);
                            return;
                        }
                    });
                });
                console.log("post: " + post._id);
                res.json(post._id);
            });
            break;
        case 2:
            break;
        default:
            res.json(200);
    }
});

module.exports = router;
