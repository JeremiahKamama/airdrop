# airdrop

This repository contains the data, scripts contracts used for the FDT airdrop as part of FIAT DAO's Jubilee program. 

The raw data and resulting list of wallets and respective rewards to be distributed in form of FDT tokens are located in the `data` folder and everyone is encouraged to review the rewards list prior to the announcement of the airdrop:

The raw data is an export of this [Dune Dashboard](https://dune.xyz/Qlab/Fiat-Barnbridge-airdrop) which has been shared publicly. The resulting list of wallets and rewards is derived through this [python script](https://colab.research.google.com/drive/1H3KpUDmAlrLtcG74UKCW6XqLgLEckAnS?usp=sharing) directly from the raw data.

If your wallet does not show up in the list this means you have not staked BOND tokens in any of the supported contracts within the eligible period and did not vote on any BarnBridge governance proposals 1 through 7. The criteria is set out in this [announcement](https://medium.com/fiat-dao/the-fiat-dao-token-jubilee-d724403f6eab).

# Active Contracts

## Mainnet Contracts

### Addresses

[MerkleDistributor](https://etherscan.io/address/0xf9E68acA402bB841084E185E6F89201927F90903)

`Merkle root hash: 0x2c200e5439f065892a8193dbd5f8cfd36e4578903208ed572e3b766e7f9630ba`

### Distribution File
**Note:** The file used in the deployment and root generation is [here](./scripts/airdrop.json).


[MerkleDistributor](https://rinkeby.etherscan.io)

## Rinkeby Contracts

### Addresses

[Rinkeby-FDT](https://rinkeby.etherscan.io/address/0xb9e8d9890b41eb4b21b52353a5d4671f48b9840f)

[MerkleDistributor](https://rinkeby.etherscan.io/address/0x1Afd8c923a5108DeEc72C17565E4550494629c61#code)

`Merkle root hash: 0xe3e4b3efdbcae06ea9c423f236f7b41c3d4a88ab9f19487a6b0e64b008c7316a`

### Distribution File
**Note:** The file used in the deployment and root generation is [here](./scripts/airdrop-test.json).
