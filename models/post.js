var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    label : {
        type: String
    },
    name : {
        type: String
    },
    description : {
        type: String
    },
    date : {
        type: Date,
        default: Date.now
    },
    upvotes : {
        type: Number
    },
    downvotes : {
        type: Number
    },
    type : {
        type: String
    },
    base64 : {
        type: String
    }
});

mongoose.model("post", PostSchema);
