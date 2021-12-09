// dependencies
// yarn add zksync
// yarn add ethers # ethers is a peer dependency of zksync

import * as zksync from "zksync";

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

const amount = zksync.utils.closestPackableTransactionAmount(ethers.utils.parseEther("0.999"));
const fee = zksync.utils.closestPackableTransactionFee(ethers.utils.parseEther("0.001"));

const transfer = await syncWallet.syncTransfer({
  to: syncWallet2.address(),
  token: "ETH",
  amount,
  fee,
});

const transferReceipt = await transfer.awaitReceipt();



const syncHttpProvider = await zksync.getDefaultProvider("localhost");
const signedTransferTx = {
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

// const readableTxInfo =
//     `Transfer 1.0 ETH\n` +
//     `To: 0x..address2\n` +
//     `Nonce: 0\n` +
//     `Fee: 0.01 ETH\n` +
//     `Account Id: 13`;
const ethSignature = "0xdddaaa...1c"; // Ethereum ECDSA signature of the readableTxInfo

const transactionHash = await syncHttpProvider.submitTx(signedTransferTx, ethSignature);
// 0x..hash (32 bytes)