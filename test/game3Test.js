const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:

    const signers = [];
    const addresses = [];
    let owner;

    const accounts = await ethers.getSigners();

    /*
    for (let i = 0; i<=2; i++){
      signers[i] = ethers.provider.getSigner(i);
      addresses[i] = await signers[i].getAddress();
    } */

    return { game, accounts };
  }

  it('should be a winner', async function () {
    const { game, accounts } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage
    // to call a contract as a signer you can use contract.connect
    
      await game.connect(accounts[0]).buy({ value: '2' });
      await game.connect(accounts[1]).buy({ value: '3' });
      await game.connect(accounts[2]).buy({ value: '1' });
    

    // TODO: win expects three arguments
    await game.win(await accounts[0].getAddress(),await accounts[1].getAddress(),await accounts[2].getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
