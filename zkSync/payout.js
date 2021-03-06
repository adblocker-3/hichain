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
const erc20Id = 2; // ethProxy.resolveTokenId("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"); // TODO
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


const ethWallet2 = ethers.Wallet.fromMnemonic(insuranceCompanyAddress).connect(ethersProvider);
const syncWallet2 = await zksync.SyncWallet.fromEthSigner(ethWallet2, syncProvider);

// withdraw funds
const withdraw = await syncWallet2.withdrawFromSyncToEthereum({
    ethAddress: ethWallet2.address,
    token: "ETH",
    amount: ethers.utils.parseEther(claim),
  });

// receipt
await withdraw.awaitVerifyReceipt();

const nounce_num =  Web3Client.eth.getTransactionCount(insuranceCompanyAddress)
const senderAccountId = async getAccountId(): Promise<number | undefined>;

const syncHttpProvider = await zksync.getDefaultProvider("localhost");
const signedTransferTx = {
  accountId: senderAccountId,
  type: "Transfer",
  from: insuranceCompanyAddress,
  to: policyHolderAddress,
  token: erc20Id,
  amount: claim,
  fee: gas,
  nonce: nounce_num,
  signature: {
    pubKey: "dead..", // hex encoded packed public key of signer (32 bytes)
    signature: "beef..", // hex encoded signature of the tx (64 bytes)
  },
};

const ethSignature = "0xdddaaa...1c"; // Ethereum ECDSA signature of the readableTxInfo

const transactionHash = await syncHttpProvider.submitTx(signedTransferTx, ethSignature); // 0x..hash (32 bytes)
