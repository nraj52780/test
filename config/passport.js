const mongoose=require('mongoose');
const keys=require('./keys.js');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require('../models/User.js');

const passportConfig=(passport)=>
     {
          passport.use(new GoogleStrategy
        (
            {
          clientID: keys.clientID,
          clientSecret:  keys.clientSecret,
          callbackURL: "/auth/google/callback",
          proxy:true
          },
          
          (accessToken,refreshToken,profile,done)=>
          {
           // console.log(accessToken);
           // console.log(profile);
            const newUser={
              googleID: profile.id,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value

            }
            User.findOne({
              googleID: profile.id
          }).then(data => {
              if(data) {
                  //Return User
                  done(null, data);
              } else {
                  //if the user is not already present, create a new one and then save
                  new User(newUser)
                      .save()
                      .then(data => done(null, data));
              }
          })

          }
        ));

        passport.serializeUser(function(data, done) {
          done(null, data.id);
        });
        
        passport.deserializeUser(function(id, done) {
          User.findById(id, function (err, data) {
            done(err, data);
          });
        });
      }

module.exports=passportConfig;