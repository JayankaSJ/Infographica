var express = require('express');
var router = express.Router();

router.route('/:file')
.get(function(req, res, next) {
    res.render('partials/' + req.params.file, {
        title: 'Inforgrapica'
    });
});

router.route('/engine/:name')
.get(function(req, res, next) {
    res.render('partials/engine/' + req.params.name, {
        title: 'Inforgrapica'
    });
});

router.route('/engine/posts/:name')
.get(function(req, res, next) {
    res.render('partials/engine/posts/' + req.params.name, {
        title: 'Inforgrapica'
    });
});

router.route('/administrator')
.get(function(req, res, next) {
    res.render('partials/administrator/index', {
        title: 'Inforgrapica'
    });
});

router.route('/administrator/:name')
.get(function(req, res, next) {
    res.render('partials/administrator/' + req.params.name, {
        title: 'Inforgrapica'
    });
});

module.exports = router;
