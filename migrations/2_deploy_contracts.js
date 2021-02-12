let ProxyFile = artifacts.require("InitializableAdminUpgradeabilityProxy");
let Box = artifacts.require("Box");

module.exports = async function(deployer,_networks,_accounts) {

  await deployer.deploy(Box);
  const BoxInstance = await Box.deployed();

  await deployer.deploy(ProxyFile);
  const ProxyFileInstance = await ProxyFile.deployed();
  await ProxyFileInstance.initialize(BoxInstance.address,_accounts[1],'0x');

  /*ProxyFactoryAddElectioneerSignatureEncoded = await web3.eth.abi.encodeFunctionSignature('addElectioneer(address)');
  ProxyFactoryAddElectioneerParameterEncoded = await web3.eth.abi.encodeParameter('address',_accounts[0]);
  str = ProxyFactoryAddElectioneerParameterEncoded.substring(2);
  ProxyFactoryAddElectioneerEncoded = ProxyFactoryAddElectioneerSignatureEncoded+str;
  await web3.eth.sendTransaction({from:_accounts[0],to:ProxyFileInstance.address,data:ProxyFactoryAddElectioneerEncoded});
*/









  /*
  await deployer.deploy(ProxyFile1);
  const ProxyFile1Instance = await ProxyFile1.deployed();
  await ProxyFile1Instance.initialize(ElectionInstance.address,ProxyAdminInstance.address,'0x');

  ElectionInitSignatureEncoded = await web3.eth.abi.encodeFunctionSignature('init(string,uint256[],uint256[],string)');
  ElectionInitParametersEncoded = web3.eth.abi.encodeParameters(['string','uint256[]','uint256[]','string'],['IT Sligo 2021',[0,1,2],[1,1,1],'URIExample']);

  ElectionInitParametersEncodedstr = ElectionInitParametersEncoded.substring(2);
  ElectionInitEncoded = ElectionInitSignatureEncoded+ElectionInitParametersEncodedstr;

  await web3.eth.sendTransaction({from:_accounts[0],to:ProxyFile1Instance.address,data:ElectionInitEncoded,gas:10000000});

  ElectionAddCandidateSignatureEncoded = await web3.eth.abi.encodeFunctionSignature('addCandidate(address,uint256,string)');

  for(i=0;i<2;i++)
  {
    for (j=1;j<3;j++)
    {
      ElectionAddCandidateParametersEncoded = await web3.eth.abi.encodeParameters(['address','uint256','string'],[_accounts[j],i,names[i][j]]);
      ElectionAddCandidatesEncodedstr = ElectionAddCandidateParametersEncoded.substring(2);
      ElectionAddCandidatesEncoded = ElectionAddCandidateSignatureEncoded+ElectionAddCandidatesEncodedstr;
      await web3.eth.sendTransaction({from:_accounts[0],to:ProxyFile1Instance.address,data:ElectionAddCandidatesEncoded,gas:10000000});

    }
  }   
*/
  /*
 
  newElectionProxyAddress = await web3.eth.sendTransaction({from:_accounts[0],to:ProxyFileInstance.address,data:ProxyFactoryDeployEncoded,gas:10000000});
  let ProxyAddress = newElectionProxyAddress.logs[0].data.substring(26);
  ProxyAddress = '0x'+ProxyAddress;

  let ElectionProxyInstance = ProxyFile1.at(ProxyAddress);
  ElectionProxyInstance = ProxyFile1.deployed();
  */




  
};

/* https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations#deployer-link-library-destinations-

Note that you will need to deploy and link any libraries your contracts depend on first before calling deploy. 
See the link function below for more details.

For more information, please see the LINK*truffle-contract*LINK documentation.

deployer.deploy(LibA);
deployer.link(LibA, B);
deployer.deploy(B);
*/


