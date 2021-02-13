// test/Box.test.js
// Load dependencies
const { expect } = require('chai');

const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');
 
// Load compiled artifacts
const Box = artifacts.require('Box');
 
// Start test block
contract('Box', function () {
  beforeEach(async function () {
    // Deploy a new Box contract for each test
    this.box = await Box.new();
  });

  it('non-zero number cannot be stored - DIRECT expectRevert', async function () {
    // Store an invalid value
    await expectRevert(this.box.store(0), 'Box: store non-zero numbers');
  });

  // .catch Test case
  it('non-zero number cannot be stored - DIRECT .catch', async function () {
    // Store an invalid value
    await this.box.store(0)
    .catch(function(error){
      console.log('This is the DIRECT .catch error block');
    })
    .finally(function(){
      console.log('This is the DIRECT finally block');
    });
  });


});
