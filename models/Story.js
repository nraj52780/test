const mongoose = require('mongoose');


// schema for the story

const StorySchema=new mongoose.Schema({
   
    title:{
        type: String,
        required:'true'
    },

    body:{
       type: String,
       required: true
    },
    status: {
        type: String,
        default: 'public'
    },

    user: {
        //type: String
       type: mongoose.Schema.Types.ObjectId,
       ref : 'users'
    },

    date:{
        type: Date,
        default: Date.now
    }

});



//Create collection and add schema
//coolection in the database has a name 'stories' not storys
const Story=mongoose.model('Story', StorySchema,'stories');
module.exports=Story;
