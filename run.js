const readline = require('readline');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');
const { saveResultToFile, updateStatus } = require('./utils');
const { generateWallets } = require('./worker');

const asciiArt = `
 __      __         _ _           _____       _ _   _
 \\ \\    / /        (_) |         |_   _|     (_) | (_)
  \\ \\  / /_ _ _ __  _| |_ _   _    | |  _ __  _| |_ _  __ _
   \\ \\/ / _\` | '_ \\| | __| | | |   | | | '_ \\| | __| |/ _\` |
    \\  / (_| | | | | | |_| |_| |  _| |_| | | | | |_| | (_| |
     \\/ \\__,_|_| |_|_|\\__|\\__, | |_____|_| |_|_|\\__|_|\\__,_|
                           __/ |
                          |___/
`;
if (isMainThread) {
    console.log(asciiArt);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query) {
    return new Promise((resolve) => rl.question(query, resolve));
}

async function handleWorkerMessage(result, workers, totalAttempts, index, startTime, filePath, suffix) {
    if (result.found) {
        await saveResultToFile(result, filePath, suffix);
        workers.forEach(worker => worker.terminate());
        rl.close();
        process.exit(0);
    } else {
        totalAttempts[index] = result.walletCount;
        updateStatus(totalAttempts, startTime);
    }
}

async function main() {
    if (isMainThread) {
        const suffix = await askQuestion('Enter the desired suffix for the vanity wallet: ');
        const filePath = await askQuestion('Enter a file name to save the wallet keys (e.g., wallet.txt): ');
        const numThreads = os.cpus().length;

        const startTime = Date.now();
        const totalAttempts = Array(numThreads).fill(0);
        const workers = [];

        for (let i = 0; i < numThreads; i++) {
            const worker = new Worker(__filename, {
                workerData: { suffix },
            });

            worker.on('message', (result) => handleWorkerMessage(result, workers, totalAttempts, i, startTime, filePath, suffix));
            worker.on('error', (err) => console.error(`Worker error: ${err}`));
            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.error(`Worker stopped with exit code ${code}`);
                }
            });

            workers.push(worker);
        }
    } else {
        generateWallets(workerData.suffix);
    }
}

main();
