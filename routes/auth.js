
const express=require('express');
const Router =require('router')
const passport=require('passport');

const router = Router()

router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res)=> {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


/*
route that verifies that user is authenticated
router.get('/verify',(req,res)=>{

  if(req.user)
  {
    console.log(req.user);
    
  }
  else
  {
    console.log('not authenticated');
    
  }
}); */

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
})


module.exports=router;