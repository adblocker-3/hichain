import { isObject } from "lodash";
import React, { useEffect, useState } from "react";

// import wallet pages
import CreateWallet from "./CreateWallet";
import ManageWallet from "./ManageWallet";
import "./Wallet.css"


const Web3 = require("web3");
const crypto = require("crypto");
const bip39 = require("bip39");
const ethers = require("ethers");

const provider =
  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
export function CreateMnemonic() {
  const bytes = crypto.randomBytes(16);
  const buffer = Buffer.from(bytes);
  const mnemonic = bip39.entropyToMnemonic(bytes.toString("hex"));
  return mnemonic;
}

export function NewWalletFromMnemonic(mnemonic) {
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  return wallet;
}

export function EncryptWallet(wallet, password) {
  const EncryptedWallet = Web3Client.eth.accounts.encrypt(
    wallet.privateKey,
    password
  );
  return EncryptedWallet;
}

export function DecryptWallet(EncryptedWallet, password) {
  const wallet = Web3Client.eth.accounts.decrypt(EncryptedWallet, password);
  return wallet;
}

export default function Wallet(props) {
  let myWallet = localStorage.getItem("myWallet");
  console.log(localStorage);
  if (isObject(JSON.parse(myWallet))) {
    console.log("good");
    return <ManageWallet></ManageWallet>;
  } else {
    console.log("you need to make a wallet");
    return <CreateWallet></CreateWallet>;
  }
  
}
