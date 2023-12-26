# Getting Started with Node and MongoDB

## Config Node JS
This project was Node.js® is an open-source, cross-platform JavaScript runtime environment. [Download Node App](https://nodejs.org/en).

## Config MongoDB
This project was MongoDB community server. [Download MongoDB](https://www.mongodb.com/try/download/community).

## Available Scripts

In the project directory, you can run:

## Installation

Use the package manager to install packages.

```node
npm install
```

## 1. create Wallet [http://localhost:5000/wallet/create_wallet](http://localhost:5000/wallet/create_wallet)

```json
Method : POST

Request:
{
    "walletName":"self_wallet"
}
```
## 2. credit/debit: [http://localhost:5000/wallet/<wallet_id>/transaction](http://localhost:5000/wallet/<wallet_id>/transaction)

```json
Method : POST

Request:
{
    "type":"CREDIT",
    "amount":"100"
}

{
    "type":"DEBIT",
    "amount":"100"
}
```
## 3. For transaction cancellation [http://localhost:5000/wallet/<wallet_id>/transaction/<transaction_id>](http://localhost:5000/wallet/<wallet_id>/transaction/<transaction_id>)

```json
Method : DELETE
```

## 4. Current balance [http://localhost:5000/wallet/<wallet_id>](http://localhost:5000/wallet/<wallet_id>)
```json
Method : GET
```
## 5. Passbook [http://localhost:5000/wallet/<wallet_id>/transaction](http://localhost:5000/wallet/<wallet_id>/transaction)

```json
Method : GET
```
## Contributing

Pull requests are welcome. please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
