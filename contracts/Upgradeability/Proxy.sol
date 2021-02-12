/* SPDX-License-Identifier: UNLICENSED */

pragma solidity ^0.7.0;

/**
 * @title Proxy
 * @dev Implements delegation of calls to other contracts, with proper
 * forwarding of return values and bubbling of failures.
 * It defines a fallback function that delegates all calls to the address
 * returned by the abstract _implementation() internal function.

  So, the fallback function first invokes willFallback which doesn't have any functionality. It is
  up to the developer to add functionality, if desired, in a derived contract.

  Then, it invokes the delegate function with the implementation function as an argument. The implementation
  function returns the address of the implementation (logic) contract. Then the delegate function takes the 
  data from the transaction that was sent by the dapp via web3.js. The transaction will not invoke any
  functions and will only have data (i.e. function call for the implementation contract)in the data field.

 */
abstract contract Proxy {

  /**
   * @dev Delegates execution to an implementation contract.
   * This is a low level function that doesn't return to its internal call site.
   * It will return to the external caller whatever the implementation returns.
   * @param implementation Address to delegate.
   */
  function _delegate(address implementation) internal {
    assembly {
      // calldatacopy(t, f, s)	-	copy s bytes from calldata at position f to mem at position t
      // Copy msg.data. We take full control of memory in this inline assembly
      // block because it will not return to Solidity code. We overwrite the
      // Solidity scratch pad at memory position 0.
      // calldatasize is the size of the call data in bytes
      calldatacopy(0, 0, calldatasize())

      // Call the implementation.
      // out and outsize are 0 because we don't know the size yet.

      // delegatecall(g, a, in, insize, out, outsize)

      // call contract at address a with input mem[in…(in+insize)) providing g gas
      // and output area mem[out…(out+outsize)) returning 0 on error (eg. out of gas) and 1 on success

      // The call* instructions use the out and outsize parameters to define an area in memory where
      // the return data is placed. This area is written to depending on how many bytes the called
      // contract returns. If it returns more data, only the first outsize bytes are written.

      // So, call contract (implementation aka logic) using data in memory from 0 to calldatasize
      // (aka the function call) and output in memory from 0 to 0. Set result equal to 0 if there's
      // an error and 1 if successful
      let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

      // Copy the returned data.
      // returndatacopy(t, f, s)	
      // copy s bytes from returndata at position f to mem at position t

      // You need to use the returndatasize opcode to check which part of this memory area contains 
      // the return data.

      // Copy returndatasize of bytes from returndata at position 0 to memory at position 0
      returndatacopy(0, 0, returndatasize())

      switch result
      // delegatecall returns 0 on error.

      // revert(p, s)	
      // end execution, revert state changes, return data mem[p…(p+s))

      // return(p, s)
      // end execution, return data mem[p…(p+s))

      case 0 { revert(0, returndatasize()) }
      default { return(0, returndatasize()) }
    }
  }

  /**
   * @dev Fallback function.
   * Implemented entirely in `_fallback`.
   */
  fallback () payable external {
    _fallback();
  }
  
   /**
    * @dev Fallback function that delegates calls to the address returned by `_implementation()`. Will run if call data
    * is empty.
    */
   receive () payable external {
     _fallback();
}

  /**
   * @return The Address of the implementation.
   */
  function _implementation() internal view virtual returns (address);

  /**
   * @dev fallback implementation.
   * Extracted to enable manual triggering.
   */
  function _fallback() internal {
    _willFallback();
    _delegate(_implementation());
  }
  
    /**
   * @dev Function that is run as the first thing in the fallback function.
   * Can be redefined in derived contracts to add functionality.
   * Redefinitions must call super._willFallback().
   */
  function _willFallback() internal virtual {
  }
}