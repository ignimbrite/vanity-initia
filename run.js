const { generateVanityWallet } = require('./src/generateWallet');

const suffix = 'aa'
const filePath = 'vanity_wallet.txt'

generateVanityWallet(suffix, filePath);
