var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
    pollName: {type: String, required: true},
    pollId: {type: String, required: true, unique: true},
    vote: [
        {
            opt: String,
            num: Number
        }
    ],
    voter: Array,
    creater: String
});

var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;