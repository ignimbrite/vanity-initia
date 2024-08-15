# Vanity-Initia
Node.js script for generating vanity wallets in the Initia Network. Vanity addresses are cryptocurrency wallet addresses that contain a specific pattern or word, making them unique and personalized.

# Features
- Generate an Initia wallet addresses with a specified suffix
- Save generated wallet details (address, private key, public key, mnemonic) to a file

# Installation
1. Clone the repository:
   ```
   git clone https://github.com/ignimbrite/vanity-initia.git
   ```
2. Navigate to the cloned directory:
   ```
   cd vanity-initia
   ```
3. Install the required dependencies:
   
   use npm
   ```
   npm install
   ```
   or yarn
   ```
   yarn install
   ```
# Usage
Run the script with the following command:
```
node run.js
```
You will be prompted to enter:
- **Suffix**: The desired suffix for your vanity wallet address.
- **File Name**: The name of the file where the wallet private details will be saved.

# Showcase
![Screenshot 2024-08-15 at 7 47 45 PM](https://github.com/user-attachments/assets/1703d5f5-7c20-4fe6-a4bb-39af9ed721f4)

# Disclaimer
This tool uses multi-threading to effectively speed up the process of generating addresses and may consume significant CPU resources.

