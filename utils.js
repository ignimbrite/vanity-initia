const fs = require('fs').promises;

async function saveResultToFile(result, filePath, suffix) {
    const walletData = `Wallet (Vanity Address):\nMnemonic: ${result.mnemonic}\nPrivate Key (Hex): ${result.privateKey}\nPublic Key: ${result.publicKey}\nWallet Address: ${result.address}\n-------------------------\n`;
    await fs.writeFile(filePath, walletData);
    console.log(`\nVanity Wallet: ${result.address}, private keys saved to ${filePath}`);
}

function updateStatus(totalAttempts, startTime) {
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    const attempts = totalAttempts.reduce((a, b) => a + b, 0);
    process.stdout.write(`\rAttempts: ${attempts}, Time: ${elapsedTime}s`);
}

module.exports = { saveResultToFile, updateStatus };
