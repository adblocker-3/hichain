// dependencies
// yarn add zksync
// yarn add ethers # ethers is a peer dependency of zksync

import * as zksync from "zksync";

const senderAddress = "0x0835D4a1494905fb3f9fEa60ADcbb937ED2fEbf3";
const senderPrivateKey = "ede7b538f9bea69191691d06ac1877e6b3f55c1335db60579d8ec293a93adf21";
const recieverAddress = "0x098F13Eb5D9e57C4Cdccf29e6232dFdF06D44801";
const erc20Id = await ethProxy.resolveTokenId("0xFab46E002BbF0b4509813474841E0716E6730136"); // TODO
const claim = "0.999";
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

// withdraw funds
const withdraw = await syncWallet2.withdrawFromSyncToEthereum({
    ethAddress: ethWallet2.address,
    token: "ETH",
    amount: ethers.utils.parseEther(claim),
  });

// receipt
await withdraw.awaitVerifyReceipt();

const nounce_no =  Web3Client.eth.getTransactionCount(senderAddress)

const syncHttpProvider = await zksync.getDefaultProvider("localhost");
const signedTransferTx = {
  accountId: 13, // id of the sender account in the zkSync
  type: "Transfer",
  from: senderAddress,
  to: recieverAddress,
  token: erc20Id,
  amount: claim,
  fee: gas,
  nonce: nounce_no,
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