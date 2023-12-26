var express = require("express");
var router  = express.Router();
var Wallet  = require("../models/wallet");
var wallet_obj = new Wallet()

router.post("/create_wallet",(req,res) => {
    wallet_obj.create_wallet(req,function(Add_rslt){
        res.json(Add_rslt);
    });
});

router.get("/:wallet_id",(req,res) => {
    var obj_data = {
        wallet_id : req.params.wallet_id
    }
    req.body = obj_data;
    wallet_obj.current_balance(req,function(transaction_rslt){
        res.json(transaction_rslt);
    });
});

router.post("/:wallet_id/transaction",(req,res) => {
    var obj_data = {
        wallet_id : req.params.wallet_id,
        type      : req.body.type,
        amount    : req.body.amount,
    }
    req.body = obj_data;
    wallet_obj.transaction(req,function(transaction_rslt){
        res.json(transaction_rslt);
    });
});

router.delete("/:wallet_id/transaction/:transaction_id",(req,res) => {
    var obj_data = {
        wallet_id : req.params.wallet_id,
        transaction_id : req.params.transaction_id
    }
    req.body = obj_data;
    wallet_obj.delete_transaction(req,function(transaction_rslt){
        res.json(transaction_rslt);
    });
});

router.get("/:wallet_id/transaction",(req,res) => {
    var obj_data = {
        wallet_id : req.params.wallet_id
    }
    req.body = obj_data;
    wallet_obj.passbook(req,function(transaction_rslt){
        res.json(transaction_rslt);
    });
});

module.exports = router;