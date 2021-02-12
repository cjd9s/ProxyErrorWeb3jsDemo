# ProxyErrorWeb3jsDemo

This is a repository to illustrate the difference between a web3.js contract object and a Truffle contract instance in error handling in proxy contracts.

To get this to work:
1. Download the files from the repository
2. Open the folder containing the files in a text editory (I use VS Code)
3. Open a new terminal
4. In the terminal, type 'npm install' to install of the dependencies listed in the package.json file
5. If you don't have Ganache, install it from https://www.trufflesuite.com/ganache
6. Run Ganache. Ensure the port number is 7545 (NOT 8545). Also, ensure that automining is turned off.

7. To see how a Truffle contract instance handles error (specifically reverted transactions from violated require statements), in the terminal type 'truffle test'

  In the test files, the store function is given an argument of 0 which violates the require statement in the contract. This will cause the     transaction to revert. You can ignore the expectRevert test case as that works in both scenarios. You should note that the .catch statement for both the direct function call and proxy function call works. There is an error because of the violated require statement and that is reflected in what is printed in the console.

8. To see how a web3.js contract object handles the error(specifically reverted transactions from violated require statements), first in the terminal type 'truffle migrate'. Then, in the terminal type 'npm run dev'.
9. When the webpage opens in a browswer, press F12 to open the DevTools.
10. Enter a 1 into the box, and click the 'Store - Event Emitter' button

  This is a valid transaction and you should see transaction hash, confirmation numbers (1-24 over time), and receipt printed in the console. 
  
11. Enter a 1 into the box, and click the 'Store - Catch' button.

  This is a valid transaction and you should see the message 'This is the .catch finally block'. This is as expected.
  
12. Now comes the illuminating part. Enter a 0 into the box, and click the 'Store - Event Emitter' button.

  This value violates the require statement in the contract and reverts the transaction. However, unlike the Truffle contract instance, the .catch statement is not invoked. Instead, an error statement is shown in the console. It correctly states that this was a revert and gives the error description defined in the require statement. However, this hasn't come through my code and I don't know how to capture that information. This is the essence of my problem. Why does .catch work with the Truffle contract instance, but not the web3.js contract object?
  
  
13. Instead of the error event from the event emitter of sendTransaction, let's try a .catch. Enter a 0 into the box, and click the 'Store - Catch' button. You should get the same as from step 12.
