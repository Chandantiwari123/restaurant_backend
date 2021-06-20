const express = require('express');
const bodyParser = require('body-parser');

//const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const cors = require('./cors')      // for cross origin resource sharing.

const Promotions = require('../models/promotions');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    Promotions.find({})
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation will not work here');
})
.post(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Promotions.remove({})
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
});

promoRouter.route('/:promoId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200);})
.get(cors.cors,(req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set: req.body
    },{new: true})
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.delete(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin,(req,res,next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotion);
    },(err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;