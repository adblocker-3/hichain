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

  const USDC = await Web3Client.utils.fromWei(result, "mwei"); // 29803630.997051883414242659
  let ETH = await Web3Client.eth.getBalance(walletAddress);
  ETH = await ethers.utils.formatEther(ETH);

  return [USDC, ETH];
}

export default function ManageWallet() {
  async function newgetBalance() {
    let balance = await getBalance();

    console.log(balance[0]);
    setL1balanceUSDC(balance[0]);
    setL1balanceETH(balance[1]);
  }
  newgetBalance();
  const [L1balanceUSDC, setL1balanceUSDC] = useState(0);
  const [L1balanceETH, setL1balanceETH] = useState(0);
  const [L2balance, setL2balance] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPublicAddress, setshowPublicAddress] = useState(false);
  const [password, setPassword] = useState("");

  const [show2ndAddress, setshow2ndAddress] = useState(false);
  const [_2ndaddress, set2ndAddress] = useState("");
  const [showTransferAmount, setShowTransferAmount] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const [showValueBox, setShowValueBox] = useState(false);

  const showingbalance = () => {
    setShowPassword(true);
  };
  const showingaddress = () => {
    setshowPublicAddress(true);
  };
  const showingwithdrawal = () => {
    setShowTransferAmount(true);
  };
  const handle_2ndaddress = () => {
    setshow2ndAddress(false);
    setShowPassword2(true);
  };
  const handleTransferAmount = () => {
    setshow2ndAddress(true);
    setShowTransferAmount(false);
  };
  const showValueBoxEvent = () => {
    setShowValueBox(true);
  };
  const USDCevent = () => {
    setShowValueBox(false);
  };
  const Transaction = async () => {
    try {
      const nonce = Web3Client.eth.getTransactionCount(walletAddress);
      const data = contract.methods
        .transfer(
          _2ndaddress,
          Web3Client.utils.toWei(transferAmount.toString(), "Mwei")
        )
        .encodeABI();
      const tx = {
        to: tokenAddress,
        gas: 70000,
        gasPrice: Web3Client.utils.toWei("100", "gwei"),
        data: data,
        nonce: nonce,
      };
      const signed_tx = Web3Client.eth.accounts
        .signTransaction(
          tx,
          DecryptWallet(localStorage.getItem("myWallet"), password).privateKey
        )
        .then((signed_tx) =>
          Web3Client.eth.sendSignedTransaction(signed_tx.rawTransaction)
        );
      setShowPassword2(false);
      console.log("success!");
    } catch (err) {
      console.log(err);
    }
  };
  const showL2balance = async () => {
    try {
      const walletPrivateKey = DecryptWallet(
        localStorage.getItem("myWallet"),
        password
      ).privateKey;
      console.log(walletAddress);
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
      setShowPassword(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3>L1 Balance ETH: {L1balanceETH}</h3>
      <h3>L1 Balance USDC: {L1balanceUSDC}</h3>
      <button className="primary-button" onClick={showingaddress}>
        Deposit
      </button>
      <button className="primary-button" onClick={showingwithdrawal}>
        Withdraw
      </button>
      {showPublicAddress && <div>My public address: {walletAddress}</div>}
      {showTransferAmount && (
        <>
          <Input
            placeholder="Input amount of USDC to send"
            onChange={(event) => setTransferAmount(event.target.value)}
            onPressEnter={(event) => handleTransferAmount()}
          ></Input>
        </>
      )}
      {show2ndAddress && (
        <>
          <Input
            placeholder="Input address to send to"
            onChange={(event) => set2ndAddress(event.target.value)}
            onPressEnter={(event) => handle_2ndaddress()}
          ></Input>
        </>
      )}
      {showPassword2 && (
        <>
          <Input.Password
            placeholder="Type your wallet password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(event) => setPassword(event.target.value)}
            onPressEnter={(event) => Transaction()}
          ></Input.Password>
        </>
      )}
      <br></br>
      <h3>L2 Balance: {L2balance}</h3>
      <button className="primary-button" onClick={showValueBoxEvent}>
        Top-Up
      </button>
      <button className="primary-button" onClick={showValueBoxEvent}>
        Withdraw
      </button>
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
      {showValueBox && (
        <>
          <Input
            placeholder="Enter Amount of USDC"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onPressEnter={(event) => USDCevent()}
          ></Input>
        </>
      )}
    </div>
  );
}
