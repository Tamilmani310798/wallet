var isEmpty     = require("is-empty");
var validator   = require("validator");

exports.create_wallet = function create_wallet(req,callback){
    var errors = {};
    //WALLET NAME
    req.body.walletName = !isEmpty(req.body.walletName) ? req.body.walletName : "";
    if(validator.isEmpty(req.body.walletName)){
        errors.message = "Please Provide Wallet Name"
    }

    if(Object.keys(errors).length){
        return callback({sts:false,msg:"Validation Fail",rslt:{},error:errors});
    }else{
        return callback({sts:true,msg:"Validation Success",rslt:{},error:{}})
    }
}

exports.transaction = function transaction(req,callback){
    var errors = {};
    //WALLET ID
    req.body.wallet_id = !isEmpty(req.body.wallet_id) ? req.body.wallet_id : "";
    if(validator.isEmpty(req.body.wallet_id)){
        errors.message = "Please Provide Wallet Id"
    }
    //TYPE
    var allow_type = ["CREDIT","DEBIT"]
    req.body.type = !isEmpty(req.body.type) ? req.body.type : "";
    if(validator.isEmpty(req.body.type)){
        errors.message = "Please Provide Transaction Type"
    }else
    if(!allow_type.includes(req.body.type.toUpperCase())){
        errors.message = "Please Provide Valid Transaction Type"
    }

    //AMOUNT
    req.body.amount = !isEmpty(req.body.amount) ? req.body.amount : "";
    req.body.amount = req.body.amount.toString();
    if(validator.isEmpty(req.body.amount)){
        errors.message = "Please Provide amount"
    }else
    if(isNaN(req.body.amount)){
        errors.message = "Please Provide amount only in Integer"
    }

    if(Object.keys(errors).length){
        return callback({sts:false,msg:"Validation Fail",rslt:{},error:errors});
    }else{
        return callback({sts:true,msg:"Validation Success",rslt:{},error:{}})
    }
}

exports.delete_transaction = function delete_transaction(req,callback){
    var errors = {};
    //WALLET ID
    req.body.wallet_id = !isEmpty(req.body.wallet_id) ? req.body.wallet_id : "";
    if(validator.isEmpty(req.body.wallet_id)){
        errors.message = "Please Provide Wallet Id"
    }

    req.body.transaction_id = !isEmpty(req.body.transaction_id) ? req.body.transaction_id : "";
    if(validator.isEmpty(req.body.transaction_id)){
        errors.message = "Please Provide Transaction Id"
    }

    if(Object.keys(errors).length){
        return callback({sts:false,msg:"Validation Fail",rslt:{},error:errors});
    }else{
        return callback({sts:true,msg:"Validation Success",rslt:{},error:{}})
    }
}

exports.current_balance = function current_balance(req,callback){
    var errors = {};
    //WALLET ID
    req.body.wallet_id = !isEmpty(req.body.wallet_id) ? req.body.wallet_id : "";
    if(validator.isEmpty(req.body.wallet_id)){
        errors.message = "Please Provide Wallet Id"
    }

    if(Object.keys(errors).length){
        return callback({sts:false,msg:"Validation Fail",rslt:{},error:errors});
    }else{
        return callback({sts:true,msg:"Validation Success",rslt:{},error:{}})
    }
}