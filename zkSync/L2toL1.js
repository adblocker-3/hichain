const zksync = require("zksync");
const Web3 = require("web3");
const ethers = require("ethers");

async function L2toL1() {
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
  const amount = "100";

  const withdraw = await syncWallet.withdrawFromSyncToEthereum({
    ethAddress: ethWallet.address,
    token: "0xeb8f08a975ab53e34d8a0330e0d34de942c95926",
    amount: ethers.utils.parseUnits(amount, 6),
  });

  // Await confirmation from the zkSync operator
  // Completes when a promise is issued to process the tx
  const withdrawReceipt = await withdraw.awaitReceipt();

  // Await verification
  // Completes when the tx reaches finality on Ethereum
  // const depositReceipt2 = await deposit.awaitVerifyReceipt();
  console.log("done!");
  console.log(withdrawReceipt);
}

L2toL1();
