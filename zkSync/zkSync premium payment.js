// dependencies
// yarn add zksync
// yarn add ethers # ethers is a peer dependency of zksync

import * as zksync from "zksync";
const Web3 = require("web3");
const provider = "http://127.0.0.1:8545";
const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));

const policyHolderAddress = "0x0835D4a1494905fb3f9fEa60ADcbb937ED2fEbf3";
const policyHolderPrivateKey = "ede7b538f9bea69191691d06ac1877e6b3f55c1335db60579d8ec293a93adf21";
const insuranceCompanyAddress = "0x098F13Eb5D9e57C4Cdccf29e6232dFdF06D44801";
const erc20Id = await ethProxy.resolveTokenId("0xFab46E002BbF0b4509813474841E0716E6730136"); // TODO
const payment = "0.999";
const gas = "0.001";

// connect to zkSync network
const syncProvider = await zksync.getDefaultProvider("localhost");
const ethersProvider = ethers.getDefaultProvider("localhost");

// zkSync authentication
if (!(await syncWallet.isSigningKeySet())) {
    if ((await syncWallet.getAccountId()) == undefined) {
      throw new Error("Unknown account");
    }
  
    // As any other kind of transaction, `ChangePubKey` transaction requires fee.
    // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkSync node for
    // the lowest possible amount.
    const changePubkey = await syncWallet.setSigningKey({
      feeToken: "ETH",
      ethAuthType: "ECDSA",
    });
  
    // Wait until the tx is committed
    await changePubkey.awaitReceipt();
  }

// making transfer in zksync
const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);
const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

const ethWallet2 = ethers.Wallet.fromMnemonic(MNEMONIC2).connect(ethersProvider);
const syncWallet2 = await zksync.SyncWallet.fromEthSigner(ethWallet2, syncProvider);

const transfer = await syncWallet.syncTransfer({
  to: syncWallet2.address(),
  token: "ETH",
  amount: zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther(payment)),
  fee: zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther(gas)),
});

const transferReceipt = await transfer.awaitReceipt();

const nounce_num =  Web3Client.eth.getTransactionCount(policyHolderAddress)
const senderAccountId = async getAccountId(): Promise<number | undefined>;

const syncHttpProvider = await zksync.getDefaultProvider("localhost");
const signedTransferTx = {
  accountId: senderAccountId,
  type: "Transfer",
  from: policyHolderAddress,
  to: insuranceCompanyAddress,
  token: erc20Id,
  amount: payment,
  fee: gas,
  nonce: nounce_num,
  signature: {
    pubKey: "dead..", // hex encoded packed public key of signer (32 bytes)
    signature: "beef..", // hex encoded signature of the tx (64 bytes)
  },
};

// const readableTxInfo =
//     `Transfer 1.0 ETH\n` +
//     `To: 0x..address2\n` +
//     `Nonce: 0\n` +
//     `Fee: 0.01 ETH\n` +
//     `Account Id: 13`;
const ethSignature = "0xdddaaa...1c"; // Ethereum ECDSA signature of the readableTxInfo

const transactionHash = await syncHttpProvider.submitTx(signedTransferTx, ethSignature);
// 0x..hash (32 bytes)