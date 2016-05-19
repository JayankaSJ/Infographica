var mongoose = require("mongoose");

var TabSchema = new mongoose.Schema({
    label : {
        type: String,
    },
    posts : [mongoose.Schema.Types.Mixed],
});

mongoose.model("tab", TabSchema);
