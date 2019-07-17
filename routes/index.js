const express=require('express');
const Router =require('router')
const passport=require('passport');
const {isAuth,isNotAuth}= require('../helpers/authmiddleware.js');
const router = Router()
const mongoose=require('mongoose');
const Story=require('../models/Story.js');

router.get('/',isNotAuth,(req,res)=>{
    res.render('index/welcome');
});

router.get('/dashboard',isAuth,(req,res)=>{

    Story.find({user: req.user.id})
    .then(stories => {
        res.render('index/dashboard',{
            stories: stories
        });
    })
   
});
module.exports=router;