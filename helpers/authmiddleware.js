
module.exports={
  isAuth : function(req,res,next){
      if(req.isAuthenticated())
      {
          return next();
      }
      res.redirect('/');
  },

  isNotAuth: function(req,res,next) {
     if(req.isAuthenticated())
     {
       res.redirect('/dashboard');
     }
     else return next();
  }
}

