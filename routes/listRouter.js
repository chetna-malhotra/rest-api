const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const listItem = require('../models/ListItem');

const listRouter=express.Router();

listRouter.route('/')
//Get all todo items
.get((req,res,next)=>{
    listItem.find(req.query)
    .then((item) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(item);
    },(err) => next(err))
    .catch((err) => next(err));
    
})
//Create a todo item
.post((req,res,next)=>{
    listItem.create(req.body)
    .then((item) => {
        console.log('Item Created ', item);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(item);
    }, (err) => next(err))
    .catch((err) => next(err));
})
//delete all todo items
.delete((req, res, next) => {
    listItem.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

listRouter.route('/:itemId')
//Get a todo item based on its ID
.get((req,res,next)=>{
    listItem.findById(req.params.itemId)
    .then((item) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(item);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
    listItem.findByIdAndUpdate(req.params.itemId, {
        $set: req.body
    }, { new: true })
    .then((item) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');            
        res.json(item);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    listItem.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');    
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});
module.exports=listRouter;
