


class Wallet {
    #wallet_schema      = null;
    #transaction_schema = null;
    constructor(){
        try{
            this.mongoose       = require("mongoose");
            //WALLET SCHEMA
            this.#wallet_schema = require("../schema/wallet");
            this.wallet_db      = this.#wallet_schema.db();

            //TRANSACTION SCHEME
            this.#transaction_schema = require("../schema/transaction");
            this.transaction_db      = this.#transaction_schema.db();

            //VALIDATION FILE
            this.validate = require("../validation/wallet");   
        }catch(e){
            console.log(e)
        }
    }

    //WALLET INSERT
    create_wallet(req,callback){
        this.validate.create_wallet(req,function(validation_rslt){
            if(!validation_rslt.sts){
                return callback(validation_rslt.error)
            }else{
                var walletName = req.body.walletName;
                this.wallet_db.findOne({walletName:new RegExp(walletName,"i")}).then(response => {
                    if(response){
                        return callback({"message": "Wallet name already exist"});
                    }else{
                        this.wallet_db.create({walletName:walletName}).then(ins_response => {
                            if(!ins_response){
                                return callback({message:"Unable to create wallet"})
                            }else{
                                return callback({message:"Wallet create success",wallet_id:ins_response._id})
                            }
                        }).catch(e => {
                            return callback({message:"Unable to create wallet"})
                        })
                    }
                }).catch(e => {
                    return callback({message:"Unable to create wallet"})
                })
            }
        }.bind(this));
    }

    //TRANSACTION INSERT
    transaction(req,callback){
        this.validate.transaction(req,function(validation_rslt){
            if(!validation_rslt.sts){
                return callback(validation_rslt.error)
            }else{
                var type        = req.body.type.toUpperCase();
                var wallet_id   = req.body.wallet_id;
                var amount      = parseFloat(req.body.amount);
                if(amount < 0){
                    return callback({message:"Amount negative value not allowed"});
                }else{
                    this.wallet_balance_calculate(wallet_id,function(calc_rslt){
                        if(!calc_rslt.sts){
                            return callback(calc_rslt);
                        }else{
                            var available_bal = calc_rslt.balance
                            if(type === "DEBIT"){
                                available_bal -= amount
                            }else
                            if(type === "CREDIT"){
                                available_bal += amount
                            }
                            if(available_bal < 0){
                                return callback({message:"Available balance will be negative value , so unable to insert this transaction"})
                            }else{
                                this.transaction_db.create({
                                    type     : type,
                                    walletId : wallet_id,
                                    amount   : amount
                                }).then(ins_response => {
                                    if(!ins_response){
                                        return callback({message:"Unable to create transaction"})
                                    }else{
                                        return callback({message:"OK",transactionId:ins_response._id})
                                    }
                                }).catch(e => {
                                    return callback({message:"Unable to create transaction"})
                                })
                            }
                        }
                    }.bind(this))
                }
            }
        }.bind(this));
    }

    //DELETE TRANSACTION
    delete_transaction(req,callback){
        this.validate.delete_transaction(req,function(validation_rslt){
            if(!validation_rslt.sts){
                return callback(validation_rslt.error)
            }else{
                var wallet_id = req.body.wallet_id;
                var transaction_id = req.body.transaction_id;
                this.transaction_db.findOneAndUpdate({walletId:wallet_id,_id:transaction_id},{$set:{type:"CANCEL"}}).then(upd_response => {
                    return callback({
                        transactionId:upd_response._id,
                        status : "CANCELLED",
                        message : "OK"
                    });
                }).catch(e => {
                    return callback({message:"Unable to delete transaction"})
                })
            }
        }.bind(this));
    }

    //CURRENT BALANCE CALCULATE
    current_balance(req,callback){
        this.validate.current_balance(req,function(validation_rslt){
            if(!validation_rslt.sts){
                return callback(validation_rslt.error)
            }else{
                this.wallet_balance_calculate(req.body.wallet_id,function(bal_rslt){
                    if(!bal_rslt.sts){
                        return callback(bal_rslt)
                    }else{
                        return callback({amount:bal_rslt.balance.toFixed(2),message:"OK"})
                    }
                })
            }
        }.bind(this))
    }

    passbook(req,callback){
        this.validate.current_balance(req,function(validation_rslt){
            if(!validation_rslt.sts){
                return callback(validation_rslt.error)
            }else{
                var wallet_id = req.body.wallet_id;
                wallet_id = new this.mongoose.Types.ObjectId(wallet_id);
                var aggregate_query = [
                    {$match:{walletId:wallet_id}},
                    {$project:{
                        _id:0,
                        type:1,
                        amount:1,
                        walletId:1,
                        transactionId:"$_id",
                        createdDate:1
                    }}
                ];
                this.transaction_db.aggregate(aggregate_query).then(agg_res => {
                    if(agg_res.length === 0){
                        return callback({message:"NO transaction found"})
                    }else{
                        return callback({transaction:agg_res,message:"OK"})
                    }
                }).catch(e => {
                    return callback({message:"Unablr to get transaction"})
                })
            }
        }.bind(this))
    }
    
    wallet_balance_calculate(wallet_id,callback){
        var wallet_id = new this.mongoose.Types.ObjectId(wallet_id);
        var aggregate_query = [
            {$match:{walletId:wallet_id,type:{$ne:"CANCEL"}}},
            {$group:{
                _id:"$type",
                amount:{$sum:"$amount"}
            }}
        ]
        this.transaction_db.aggregate(aggregate_query).then(agg_res => {
            var available_bal = 0;
            if(agg_res.length > 0){
                agg_res.map((value) => {
                    if(value._id === "CREDIT"){
                        available_bal += value.amount
                    }else
                    if(value._id === "DEBIT"){
                        available_bal -= value.amount
                    }
                })
            }
            return callback({sts:true,message:"Available balance",balance:available_bal});
        }).catch(e => {
            return callback({sts:false,message:"Unable to insert transaction"})
        })
    }
}

module.exports = Wallet