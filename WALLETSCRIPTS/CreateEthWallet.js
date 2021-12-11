//index.js

const Web3 = require("web3");

const provider = "http://127.0.0.1:8545";

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

const newAccount = Web3Client.eth.accounts.create();

const password = "123456789";

const newAccountEncrypted = Web3Client.eth.accounts.encrypt(
  newAccount.privateKey,
  password
);

const newAccountDecrypted = Web3Client.eth.accounts.decrypt(
  newAccountEncrypted,
  password
);

//you can store newAccountEncrypted in a database

console.log(newAccountEncrypted);

console.log(newAccountDecrypted);
