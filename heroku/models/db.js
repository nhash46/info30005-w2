var mongoose = require('mongoose');

const uri = "mongodb+srv://nhash:Hashem41@info30005-n8rlv.mongodb.net/test?retryWrites=true&w=majority";
// const uri = "mongodb://nhash:Hashem41@localhost:3000/info30005";

mongoose.connect(uri, { useNewUrlParser: true },
    function(err){
    if(!err){
        console.log('Connected to mongo.');
    }else{
        console.log('Failed to connect to mongo!', err);
    }
});

require('./cafe.js');
