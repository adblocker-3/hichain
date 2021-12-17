import { isObject } from "lodash";
import React, { useEffect, useState } from "react";

const Web3 = require("web3");
const crypto = require("crypto");
const bip39 = require("bip39");
const ethers = require("ethers");

const provider =
  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
function CreateMnemonic() {
  const bytes = crypto.randomBytes(16);
  const buffer = Buffer.from(bytes);
  const mnemonic = bip39.entropyToMnemonic(bytes.toString("hex"));
  return mnemonic;
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

const mnemonic = CreateMnemonic();
const wallet = NewWalletFromMnemonic(mnemonic);
const encrypted = EncryptWallet(wallet, "123456789");
localStorage.setItem("myWallet", JSON.stringify(encrypted));
export default function Wallet(props) {
  let myWallet = localStorage.getItem("myWallet");
  myWallet = JSON.parse(myWallet);
  console.log(typeof myWallet);
  console.dir(DecryptWallet(myWallet, "123456789").privateKey);
  if (isObject(myWallet)) {
    console.log("good");
    return <Button
    block
    bsSize="large"
    type="submit"
    >
    Login
    </Button>
  } else {
    console.log("you need to make a wallet");
    return <Button
    block
    bsSize="large"
    type="submit"
    >
    Login
    </Button>
  }
}
