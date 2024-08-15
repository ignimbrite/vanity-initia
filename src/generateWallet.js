const { MnemonicKey } = require('@initia/initia.js');
const fs = require('fs');

async function generateVanityWallet(suffix, filePath) {
    let walletData = '';
    let walletCount = 0;

    while (true) {
        const key = new MnemonicKey({
            account: 0,
            index: walletCount,
            coinType: 118,
        });

        const address = key.accAddress;
        if (address.endsWith(suffix)) {
            walletData += `Wallet ${walletCount + 1} (Vanity Address):\n`;
            walletData += `Mnemonic: ${key.mnemonic}\n`;
            walletData += `Private Key (Hex): ${key.privateKey.toString('hex')}\n`;
            walletData += `Public Key: ${key.publicKey.key}\n`;
            walletData += `Wallet Address: ${address}\n`;
            walletData += '-------------------------\n';
            break;
        }

        walletCount++;
    }

    fs.writeFileSync(filePath, walletData);
    console.log(`Vanity wallet with suffix "${suffix}" successfully generated and saved to ${filePath}`);
}

module.exports = { generateVanityWallet };
