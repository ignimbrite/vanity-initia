const { parentPort } = require('worker_threads');
const { MnemonicKey } = require('@initia/initia.js');

function generateWallets(suffix) {
    let walletCount = 0;
    while (true) {
        const key = new MnemonicKey({
            account: 0,
            index: walletCount,
            coinType: 118,
        });

        const address = key.accAddress;
        walletCount++;

        if (address.endsWith(suffix)) {
            parentPort.postMessage({
                found: true,
                walletCount,
                mnemonic: key.mnemonic,
                privateKey: key.privateKey.toString('hex'),
                publicKey: key.publicKey.key,
                address,
            });
            break;
        }

        parentPort.postMessage({ found: false, walletCount });
    }
}

module.exports = { generateWallets };
