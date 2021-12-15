//index.js

const Web3 = require("web3");
const crypto = require("crypto");
const bip39 = require("bip39");
const ethers = require("ethers");

const provider = "http://127.0.0.1:8545";

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

function CreateMnemonic() {
  const bytes = crypto.randomBytes(16);
  const buffer = Buffer.from(bytes);
  const mnemonic = bip39.entropyToMnemonic(bytes.toString("hex"));
  return mnemonic;
}

function ConfirmMnemonic(mnemonic, usermnemonic) {
  return mnemonic === usermnemonic;
}

function NewWalletFromMnemonic(mnemonic) {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  return wallet;
}

function EncryptWallet(wallet, password) {
  const EncryptedWallet = Web3Client.eth.accounts.encrypt(
    wallet.privateKey,
    password
  );
  return EncryptedWallet;
}

function DecryptWallet(EncryptedWallet, password) {
  const wallet = Web3Client.eth.accounts.decrypt(EncryptedWallet, password);
  return wallet;
}

var mnemonic = CreateMnemonic();

var wallet = NewWalletFromMnemonic(mnemonic);

console.log(wallet.privateKey);

var EncryptedWallet = EncryptWallet(wallet, "123456789");

console.log(EncryptedWallet);
