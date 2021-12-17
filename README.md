# HiChain

## Introduction
There are three main folders to consider. Two of them handle the transactions while the last one handles the front-end to showcase our app.

### affinidi-web
This web-app provides the front-end for the HiChain app.

### To run
1. Open terminal and navigate to the project folder
2. Run `npm install`
3. Create `.env` and fill in accordingly:

// Based on your OS, uncomment one of 2 following SASS_PATH entries
// SASS_PATH=./node_modules;./src # For Windows OS
// SASS_PATH=node_modules:src # For Unix OS
BROWSER=none
REACT_APP_API_KEY=1b72cfc2-0d4d-4afe-b005-9616574e901c
REACT_APP_API_KEY_HASH=eea317359d5adade10a67ba555959e5cba5142c025fe89d600f81e35645ac201
REACT_APP_ENVIRONMENT=dev
REACT_APP_WALLET_URL=http://localhost:3001/

4. Run `npm start`

### WALLETSCRIPTS
This handles the transactions between layer1 accounts.

### To run
1. Open terminal and navigate to the project folder
2. Decide which .js file to run
3. Run `node abc.js`

### zkSync
This handles the transactions between layer1 and layer2.

### To run
1. Open terminal and navigate to the project folder
2. Decide which .js file to run
3. Run `node abc.js`
