var mongoose = require("mongoose");
const { Schema } = mongoose;

var walletSchema  = new Schema({
    walletName:{
        alias   : "Wallet Name",
        type    : "String",
        unique  : true,
        default : ""
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

var tableName = mongoose.model("wallet", walletSchema);

exports.db = function db(){
    return tableName;
}