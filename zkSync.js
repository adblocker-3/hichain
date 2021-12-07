// dependencies
yarn add zksync
yarn add ethers # ethers is a peer dependency of zksync

import * as zksync from "zksync";
import { Wallet } from "zksync";

// connect to zkSync network
const syncProvider = await zksync.getDefaultProvider("rinkeby");
const ethersProvider = ethers.getDefaultProvider("rinkeby");

// ???
// creating zkSync wallet
// Create ethereum wallet using ethers.js
const ethWallet = ethers.Wallet.fromMnemonic(MNEMONIC).connect(ethersProvider);

// Derive zksync.Signer from ethereum wallet.
const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);


// how to deposit
const deposit = await syncWallet.depositToSyncFromEthereum({
    depositTo: syncWallet.address(),
    token: "ETH",
    amount: ethers.utils.parseEther("1.0"),
  });

// check status of deposit
// Await confirmation from the zkSync operator
// Completes when a promise is issued to process the tx
const depositReceipt = await deposit.awaitReceipt();

// Await verification
// Completes when the tx reaches finality on Ethereum
const depositReceipt = await deposit.awaitVerifyReceipt();



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


// check zkSync account balance
// Committed state is not final yet
const committedETHBalance = await syncWallet.getBalance("ETH");

// Verified state is final
const verifiedETHBalance = await syncWallet.getBalance("ETH", "verified");



// making transfer in zksync (//TODO)
const ethWallet2 = ethers.Wallet.fromMnemonic(MNEMONIC2).connect(ethersProvider);
const syncWallet2 = await zksync.SyncWallet.fromEthSigner(ethWallet2, syncProvider);

const amount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther("0.999"));
const fee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther("0.001"));

const transfer = await syncWallet.syncTransfer({
  to: syncWallet2.address(),
  token: "ETH",
  amount,
  fee,
});


const amount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther("0.999"));


const transfer = await syncWallet.syncTransfer({
  to: syncWallet2.address(),
  token: "ETH",
  amount,
});


const transferReceipt = await transfer.awaitReceipt();



// withdraw funds
const withdraw = await syncWallet2.withdrawFromSyncToEthereum({
    ethAddress: ethWallet2.address,
    token: "ETH",
    amount: ethers.utils.parseEther("0.998"),
  });

// receipt
await withdraw.awaitVerifyReceipt();







// Submit transactions batch
import * as zksync from "zksync";

const syncHttpProvider = await zksync.getDefaultProvider("rinkeby");
const firstTransferTx = {
  accountId: 13, // id of the sender account in the zkSync
  type: "Transfer",
  from: "0x..address1",
  to: "0x..address2",
  token: 0, // id of the ETH token
  amount: "1000000000000000000", // 1 Ether in Wei
  fee: "10000000000000000", // 0.01 Ether in Wei
  nonce: 0,
  signature: {
    pubKey: "dead..", // hex encoded packed public key of signer (32 bytes)
    signature: "beef..", // hex encoded signature of the tx (64 bytes)
  },
};
const firstTransferEthSignature = "0xdddaaa...1c"; // Ethereum ECDSA signature for the first message

const secondTransferTx = {
  type: "Transfer",
  // ...other fields omitted
};
const secondTransferEthSignature = "0xaaaddd...ff"; // Ethereum ECDSA signature for the second message

const batch = [
  { tx: firstTransferTx, signature: firstTransferEthSignature },
  { tx: secondTransferTx, signature: secondTransferEthSignature },
];

const transactionHashes = await syncHttpProvider.submitTxsBatch(batch);
// List of transaction hashes



// Wait for transaction receipt
async notifyTransaction(
    hash: string,
    action: "COMMIT" | "VERIFY"
): Promise<TransactionReceipt> ;

// how to call
import * as zksync from "zksync";

const syncHttpProvider = await zksync.getDefaultProvider("rinkeby");

const receipt = await syncHttpProvider.notifyTransaction("sync-tx:1111111111111111111111111111111111111111111111111111111111111111", "COMMIT");



// transaction batch fee
async getTransactionsBatchFee(
    txTypes: ("Transfer" | "Withdraw" | "FastWithdraw" | ChangePubKeyFee | LegacyChangePubKeyFee)[],
    addresses: Address[],
    tokenLike: TokenLike
): Promise<BigNumber>;