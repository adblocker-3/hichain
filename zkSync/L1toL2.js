const zksync = require("zksync");
const Web3 = require("web3");
const ethers = require("ethers");

async function L1toL2() {
  const provider =
    "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
  const Web3Client = new Web3(new Web3.providers.HttpProvider(provider));
  const policyHolderAddress = "0xd9A0c0e6205b60256ADB67F72E9A86bC142a30d2";
  const policyHolderPrivateKey =
    "79f1bf4cb22810cfa031d01930d70a5bfb012da10403d525c29a1adb222f852e";

  const syncProvider = await zksync.getDefaultProvider("rinkeby");
  const ethersProvider = await ethers.getDefaultProvider(provider);

  const ethWallet = new ethers.Wallet(policyHolderPrivateKey, ethersProvider);
  const syncWallet = await zksync.Wallet.fromEthSigner(ethWallet, syncProvider);

  const amount = "100";

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
}

L1toL2();
