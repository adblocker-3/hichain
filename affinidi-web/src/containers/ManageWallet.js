import { Input } from "antd";
import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  CreateMnemonic,
  NewWalletFromMnemonic,
  EncryptWallet,
  DecryptWallet,
} from "./Wallet";
const zksync = require("zksync");
const Web3 = require("web3");
const ethers = require("ethers");

const provider =
  "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

// The minimum ABI required to get the ERC20 Token balance
const contract_abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    name: "MaxApprove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "TransferOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "_burnaddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_feeBurn",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "subtractedValue", type: "uint256" },
    ],
    name: "decreaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "addedValue", type: "uint256" },
    ],
    name: "increaseAllowance",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint8", name: "_owned", type: "uint8" }],
    name: "renouncedOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "BurnFee", type: "uint256" }],
    name: "setTaxFeePercent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const tokenAddress = "0xeb8f08a975ab53e34d8a0330e0d34de942c95926";
const walletAddress = localStorage.getItem("myWalletPublic");
const contract = new Web3Client.eth.Contract(contract_abi, tokenAddress);

async function getBalance() {
  const result = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659

  const format = await Web3Client.utils.fromWei(result, "mwei"); // 29803630.997051883414242659

  return format;
}

export default function ManageWallet() {
  async function newgetBalance() {
    let newbalance = await getBalance();
    console.log(newbalance);
    setL1balance(newbalance);
  }
  newgetBalance();
  const [L1balance, setL1balance] = useState(0);
  const [L2balance, setL2balance] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const showingbalance = () => {
    setShowPassword(true);
  };
  const showL2balance = async () => {
    try {
      const walletPrivateKey = DecryptWallet(
        localStorage.getItem("myWallet"),
        password
      ).privateKey;
      console.log(walletPrivateKey);
      const syncProvider = await zksync.getDefaultProvider("rinkeby");
      const ethersProvider = await ethers.getDefaultProvider(provider);

      const ethWallet = new ethers.Wallet(walletPrivateKey, ethersProvider);
      const syncWallet = await zksync.Wallet.fromEthSigner(
        ethWallet,
        syncProvider
      );
      const committedUSDCBalance = await syncWallet.getBalance(tokenAddress);
      console.log(committedUSDCBalance);
      setL2balance(
        ethers.utils
          .formatUnits(parseInt(committedUSDCBalance._hex, 16).toString(), 6)
          .toString()
      );
      console.log(L2balance);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>L1 Balance: {L1balance}</h3>
      <button className="primary-button">Deposit</button>
      <button className="primary-button">Withdraw</button>
      <br></br>
      <h3>L2 Balance: {L2balance}</h3>
      <button className="primary-button">Top-Up</button>
      <button className="primary-button">Withdraw</button>
      <button className="primary-button" onClick={showingbalance}>
        Show Balance
      </button>
      {showPassword && (
        <>
          <Input.Password
            placeholder="Type your wallet password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(event) => setPassword(event.target.value)}
            onPressEnter={(event) => showL2balance()}
          ></Input.Password>
        </>
      )}
    </div>
  );
}
