// test/Box.proxy.test.js
// Load dependencies
const { expect } = require('chai');

const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');

const { deployProxy } = require('@openzeppelin/truffle-upgrades');
 
// Load compiled artifacts
const Box = artifacts.require('Box');
 
// Start test block
contract('Box (proxy)', function () {
  beforeEach(async function () {
    // Deploy a new Box contract for each test
    this.box = await deployProxy(Box, [42], {initializer: 'store'});
  });
 
  // Test case
  it('non-zero number cannot be stored', async function () {
    // Store an invalid value
    await expectRevert(this.box.store(0), 'Box: store non-zero numbers');
  });

  // .catch Test case
  it('non-zero number cannot be stored', async function () {
    // Store an invalid value
    await this.box.store(0)
    .catch(function(error){
      console.log('This is the PROXY .catch error block');
    })
    .finally(function(){
      console.log('This is the PROXY finally block');
    });
  });



});