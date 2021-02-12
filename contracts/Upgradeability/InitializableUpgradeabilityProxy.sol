/* SPDX-License-Identifier: UNLICENSED */

pragma solidity ^0.7.0;

import './BaseUpgradeabilityProxy.sol';

/**
 * @title InitializableUpgradeabilityProxy
 * @dev Extends BaseUpgradeabilityProxy with an initializer for initializing
 * implementation and init data.
 */
contract InitializableUpgradeabilityProxy is BaseUpgradeabilityProxy {
  /**
   * @dev Contract initializer.
   * @param _logic Address of the initial implementation.
   * @param _data Data to send as msg.data to the implementation to initialize the proxied contract.
   * It should include the signature and the parameters of the function to be called, as described in
   * https://solidity.readthedocs.io/en/v0.4.24/abi-spec.html#function-selector-and-argument-encoding.
   * This parameter is optional, if no data is given the initialization call to proxied contract will be skipped.
   */

   /*
    The deployed election state contract will inherit the proxy functionality contract.

    So, when we create our next election state contract from our contract factory, we will run the intialize
    function in the state contract. This initialize function will have to do a variety of tasks including:

      - Set the owner for the state contract
      - Initialize constructor functions of the the parent contracts
      - electionName = _electionName;
      - state = State.Populating;
      - ids = _ids;
      - amounts = _amounts;
   
    */
  function initialize(address _logic, bytes memory _data) public payable {
    // ensures that the implementation contract hasn't been deployed yet
    // This also ensures that the intialize function can only be run once per proxy contract
    // (Because the implementation contract address is stored in the proxy contract)

    require(_implementation() == address(0));

    // Ensures that the address for the implementation contract is as defined in the standard

    
    assert(IMPLEMENTATION_SLOT == bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1));

    // change address for implementation contract
    _setImplementation(_logic);
    // Run only if there is an encoded function call in the payload
    if(_data.length > 0) {
      
      // <address>.delegatecall(bytes memory) returns (bool, bytes memory)

      // issue low-level DELEGATECALL with the given payload, returns success condition and return data,
      // forwards all available gas, adjustable

      // code at the target address is executed in the context of the calling contract and msg.sender
      // and msg.value do not change their values.
      
      // call implementation contract with the parameter data that will set the state variables in the proxy contract
      (bool success,) = _logic.delegatecall(_data);
      require(success);
    }
  }
}