const express=require('express');
const Router =require('router')
const passport=require('passport');
const {isAuth,isNotAuth}= require('../helpers/authmiddleware.js');
const router = Router();
const mongoose=require('mongoose');
const Story=require('../models/Story.js');
const User=require('../models/User.js');


//route for the public stories
//visible for both authentictaed as well as non authenticated users
router.get('/',(req,res)=>{
    //fetch only the public stories
    Story.find({status: 'public'})
    .populate('user')
    .sort({date:'desc'})
    .then(stories => {
        res.render('stories/index' ,{
            stories: stories
        });
    })
    
});
// route for the single story
router.get('/show/:id',(req,res)=>{

    Story.findOne({
        _id: req.params.id
    })
    .populate('user')
    .then(story => {
        res.render('stories/show',{
            story: story
        })
    })
});

router.post('/',(req,res)=>{
  //   res.send('hi i am the post route')
   //  console.log(req.body);

   const newStory={
    title:  req.body.title,
    body:   req.body.body,
    status: req.body.status,
    user:   req.user.id

  }
  new Story(newStory)
  .save()
  .then(story => {
      res.redirect(`/stories/show/${story.id}`);
  });
     
});

//route for adding a story
router.get('/add',isAuth,(req,res)=>{
    res.render('stories/add');
});

//route for editing a story

router.get('/edit/:id',isAuth,(req,res)=>{
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
        res.render('stories/edit',{
            story: story
        })
    })
});

//edit form using put 
router.put('/:id',(req,res)=>{
    
    //res.send('edit form working')
    Story.findOne({
        _id: req.params.id
    })
    .then(story => {
      
        story.title=req.body.title;
        story.body= req.body.body;
        story.status= req.body.status;
        
        story.save()
         .then(story => {
         res.redirect('/dashboard');
    });
});
});

//delete story route

router.delete('/:id',(req,res)=>{
    Story.remove({
        _id: req.params.id
    })
    .then(()=>{
        res.redirect('/dashboard');
    });
});


//list all stories from specific user
router.get('/user/:userid',(req,res)=>{

    Story.find({user: req.params.userid, status: 'public'})
    .populate('user')
    .then(stories => {
        res.render('stories/index2',{
            stories:stories
        });
    });
});
module.exports=router;