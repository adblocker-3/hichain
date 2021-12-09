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

string claim = "0.999"; // update accordingly
string gas = "0.001";

// withdraw funds
const withdraw = await syncWallet2.withdrawFromSyncToEthereum({
    ethAddress: ethWallet2.address,
    token: "ETH",
    amount: ethers.utils.parseEther(claim),
  });

// receipt
await withdraw.awaitVerifyReceipt();

const erc20Id = await ethProxy.resolveTokenId("0xFab46E002BbF0b4509813474841E0716E6730136"); // update accordingly

const syncHttpProvider = await zksync.getDefaultProvider("localhost");
const signedTransferTx = {
  accountId: 13, // id of the sender account in the zkSync
  type: "Transfer",
  from: "0x..address1",
  to: "0x..address2",
  token: erc20Id,
  amount: claim,
  fee: gas,
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