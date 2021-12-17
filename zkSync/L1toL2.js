const zksync = require("zksync");
const Web3 = require("web3");
const ethers = require("ethers");

async function L1toL2() {
  const provider =
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
  const policyHolderAddress = "0xe225c27BefCED9E6878abe5C2391d2F703890718";
  const policyHolderPrivateKey =
    "0x511f33283daaaa3f39d40007ed545dd58d8907cd333b4bd737baafc33692afb1";

  const syncProvider = await zksync.getDefaultProvider("rinkeby");
  const ethersProvider = await ethers.getDefaultProvider(provider);

  const ethWallet = new ethers.Wallet(policyHolderPrivateKey, ethersProvider);
  const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

  // if (!(await syncWallet.isSigningKeySet())) {
  //   if (syncWallet.getAccountId() == undefined) {
  //     throw new Error("Unknown account");
  //   }
  // const onchainAuthTransaction = await syncWallet.onchainAuthSigningKey();
  // // Wait till transaction is committed on ethereum.
  // await onchainAuthTransaction.wait();
  // As any other kind of transaction, `ChangePubKey` transaction requires fee.
  // User doesn't have (but can) to specify the fee amount. If omitted, library will query zkSync node for
  // the lowest possible amount.
  // const changePubkey = await syncWallet.setSigningKey({
  //   feeToken: "0xeb8f08a975ab53e34d8a0330e0d34de942c95926",
  //   ethAuthType: "ECDSA",
  // });

  // // Wait until the tx is committed
  // await changePubkey.awaitReceipt();
  // }

  const amount = "200";

  const deposit = await syncWallet.depositToSyncFromEthereum({
    depositTo: syncWallet.address(),
    token: "0xeb8f08a975ab53e34d8a0330e0d34de942c95926",
    amount: ethers.utils.parseUnits(amount, 6),
  });

  // Await confirmation from the zkSync operator
  // Completes when a promise is issued to process the tx
  const depositReceipt = await deposit.awaitReceipt();

  // Await verification
  // Completes when the tx reaches finality on Ethereum
  // const depositReceipt2 = await deposit.awaitVerifyReceipt();
  // console.log("done!");
  console.log(depositReceipt);
}

L1toL2();
