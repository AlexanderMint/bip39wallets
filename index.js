const bitcoin = require('bitcoinjs-lib');
const bip32 = require('bip32');
const bip39 = require('bip39');

/*************
 Config
*************/

const config = {
  mnemonic: 'finger enhance endorse barely empower tonight gallery mule mention improve rocket miracle',
  testnet: false
}

/*************
 Mnemonic
*************/

const mnemonic = config.mnemonic ? config.mnemonic : bip39.generateMnemonic();

console.log('mnemonic: ', mnemonic);

if(!bip39.validateMnemonic(mnemonic)) { throw('Invalid mnemonic value'); }

/*************
 Root
*************/

const currentNetwork = config.testnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;

const seed = bip39.mnemonicToSeed(mnemonic);
const master = bip32.fromSeed(seed, currentNetwork);

/*************
 Wallets
*************/

const wallets = {
  btc: 0,
  eth: 60,
  eos: 194
}

/*************
 Generate
*************/

for(const index in wallets) {
  console.log(index.toUpperCase())

  const coinPath = "44'/" + (config.testnet ? 1: 0) + "'/" + wallets[index] + "'";
  const node = master.derivePath(coinPath);

  // xPub
  const nodeXpub = node.neutered().toBase58();
  console.log('xpub', nodeXpub, coinPath);
}
