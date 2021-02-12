App = {
    web3Provider: null,
    contracts: {},
    accounts: [],

    initWeb3: async function() {
        App.web3Provider = new Web3.providers.WebsocketProvider('ws://localhost:7545');
        web3 = new Web3(App.web3Provider);        
        return App.initContracts();
    },

    initContracts: function() {
        $.getJSON('InitializableAdminUpgradeabilityProxy.json', function(data) {
            web3.eth.net.getId().then(networkId => {
                let Proxy = data;
                const deployedNetworkAddress = Proxy.networks[networkId].address;
                App.contracts.Proxy = new web3.eth.Contract(Proxy.abi, deployedNetworkAddress);
                App.contracts.Proxy.setProvider(App.web3Provider);
            });
        });

        $.getJSON('Box.json', function(data) {
            web3.eth.net.getId().then(networkId => {
                let Box = data;
                const deployedNetworkAddress = Box.networks[networkId].address;
                App.contracts.Box = new web3.eth.Contract(Box.abi, deployedNetworkAddress);
                App.contracts.Box.setProvider(App.web3Provider);
            });
        });
        return App.initApp()
    },

    initApp: async function(){
        App.accounts = await web3.eth.getAccounts();
        return App.bindEvents()
    },

    bindEvents: function() {
        $(document).on('click', '#storeEE', App.storeEE);
        $(document).on('click', '#storeCatch', App.storeCatch);
    },

    storeEE: async function(event){
        let storeValue = document.getElementById("storeValue").value;
        let storeEncoded = await App.contracts.Box.methods.store(storeValue).encodeABI();
        let gasEstimate = await web3.eth.estimateGas({from:App.accounts[0],to:App.contracts.Proxy.options.address,data:storeEncoded});
        await web3.eth.sendTransaction({from:App.accounts[0],to:App.contracts.Proxy.options.address,data:storeEncoded,gas:gasEstimate})
        .once('transactionHash', function(hash){
            console.log(hash);    
        })
        .once('receipt', function(receipt){
            console.log(receipt);
        })
        .on('confirmation', function(confirmationNumber, receipt){
           console.log(confirmationNumber);
        })
        .on('error', function(error){
            console.log('This is the emitter error block',error);
        });
    },

    storeCatch: async function(event){
        let storeValue = document.getElementById("storeValue").value;
        let storeEncoded = await App.contracts.Box.methods.store(storeValue).encodeABI();
        let gasEstimate = await web3.eth.estimateGas({from:App.accounts[0],to:App.contracts.Proxy.options.address,data:storeEncoded});

        //let transactionReceipt = await 
        await web3.eth.sendTransaction({from:App.accounts[0],to:App.contracts.Proxy.options.address,data:storeEncoded,gas:gasEstimate})
        .catch(function(error){
            console.log('This is the .catch error block');
        })
        .finally(function(){
            console.log('This is the .catch finally block');
        });
    }
};

$(function() {
    $(window).load(function() {
      App.initWeb3();
    });
  });