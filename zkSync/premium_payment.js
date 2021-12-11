// dependencies
// yarn add zksync
// yarn add ethers # ethers is a peer dependency of zksync

const zksync = require("zksync");
const Web3 = require("web3");
const ethers = require("ethers");

async function asyncCall() {
  // const syncHTTPProvider = await zksync.Provider.newHttpProvider(
  //   "https://rinkeby-api.zksync.io/jsrpc"
  // );
  const provider = "http://127.0.0.1:8545";
  const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
  const policyHolderAddress = "0xd9A0c0e6205b60256ADB67F72E9A86bC142a30d2";
  const policyHolderPrivateKey =
    "0x79f1bf4cb22810cfa031d01930d70a5bfb012da10403d525c29a1adb222f852e";
  const insuranceCompanyAddress = "0x1173f173F5A86BCDA22c74F78463BD5899EaecA1";
  const insuranceCompanyPrivateKey =
    "87fd3fda64b1e556daf32d0d60daae262bcbb511fe026afcf088ead06cc850c6";
  const erc20Id = 2; //ethProxy.resolveTokenId("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"); // TODO
  const payment = "100";
  const gas = "0.001";

  // connect to zkSync network
  const syncProvider = await zksync.getDefaultProvider("rinkeby");
  const ethersProvider = await ethers.getDefaultProvider(provider);
  //mnemonic = "dog cat cow "
  // making transfer in zksync
  // const ethWallet = ethers.Wallet.fromMnemonic(policyHolderAddress).connect(ethersProvider);
  const ethWallet = new ethers.Wallet(policyHolderPrivateKey, ethersProvider);
  const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

  const ethWallet2 = new ethers.Wallet(
    insuranceCompanyPrivateKey,
    ethersProvider
  );
  const syncWallet2 = await zksync.Wallet.fromEthSigner(
    ethWallet2,
    syncProvider
  );

  const transfer = syncWallet.syncTransfer({
    to: syncWallet2.address(),
    token: "ETH",
    amount: zksync.utils.closestPackableTransactionAmount(
      ethers.utils.parseEther(payment)
    ),
    fee: zksync.utils.closestPackableTransactionFee(
      ethers.utils.parseEther(gas)
    ),
  });

  // zkSync authentication
  if (!syncWallet.isSigningKeySet()) {
    if (syncWallet.getAccountId() == undefined) {
      throw new Error("Unknown account");
    }

    // As any other kind of transaction, `ChangePubKey` transaction requires fee.
    // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkSync node for
    // the lowest possible amount.
    const changePubkey = syncWallet.setSigningKey({
      feeToken: "ETH",
      ethAuthType: "ECDSA",
    });

    // Wait until the tx is committed
    await changePubkey.awaitReceipt();
  }

  // const transferReceipt = await transfer.awaitReceipt();

  const nonce_num = await Web3Client.eth.getTransactionCount(
    policyHolderAddress
  );
  console.log(nonce_num);
  const senderAccountId = 1;
  const signedTransferTx = {
    accountId: senderAccountId,
    type: "Transfer",
    from: policyHolderAddress,
    to: insuranceCompanyAddress,
    token: erc20Id,
    amount: payment,
    fee: gas,
    nonce: nonce_num,
    signature: {
      pubKey: "0xd9A0c0e6205b60256ADB67F72E9A86bC142a30d2", // hex encoded packed public key of signer (32 bytes)
      signature: "beef..", // hex encoded signature of the tx (64 bytes)
    },
  };
  const ethSignature = "0xdddaaa...1c"; // Ethereum ECDSA signature of the readableTxInfo
  const transactionHash = syncProvider.submitTx(signedTransferTx, ethSignature); // 0x..hash (32 bytes)
}
asyncCall();
