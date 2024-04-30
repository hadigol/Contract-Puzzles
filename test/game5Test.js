const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const account = await ethers.getImpersonatedSigner(
      "0x00019A62F14DE9dF80C6991DF3E4CEB2bC2138E1"
    );

    await network.provider.send("hardhat_setBalance", [
      "0x00019A62F14DE9dF80C6991DF3E4CEB2bC2138E1",
      "0xFFFFFFFFFFFFFFFFFFFF",
    ]);

    return { game, account };
  }
  it('should be a winner', async function () {
    const { game, account } = await loadFixture(deployContractAndSetVariables);

    await game.connect(account).win();


    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
