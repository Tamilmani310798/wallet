var mongoose = require("mongoose");
const { Schema } = mongoose;

var transSchema  = new Schema({
    walletId:{
        alias   : "Wallet Name",
        type    : mongoose.Types.ObjectId,
        ref     : "wallet",
        default : null
    },
    type:{
        alias   : "Wallet Name",
        type    : String,
        default : ""
    },
    amount:{
        alias   : "Amount",
        type    : Number,
        default : 0
    },
    createdBy: {
        alias   : "Created By",
        type    : mongoose.Types.ObjectId,
        default : null
    },
    createdDate:{
        alias   : "Created Date",
        type    : Date,
        default : Date.now()
    },
    updatedBy: {
        alias   : "Updated By",
        type    : mongoose.Types.ObjectId,
        default : null
    },
    updatedDate:{
        alias   : "Updated Date",
        type    : Date,
        default : null
    },
    deletedBy: {
        alias   : "Deleted By",
        type    : mongoose.Types.ObjectId,
        default : null
    },
    deletedDate:{
        alias   : "Deleted Date",
        type    : Date,
        default : null
    }
});

var tableName = mongoose.model("transaction", transSchema);

exports.db = function db(){
    return tableName;
}