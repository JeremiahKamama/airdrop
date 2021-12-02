require("dotenv").config();
import * as config from './config';
import { task, HardhatUserConfig } from 'hardhat/config';

import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import "@typechain/hardhat";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
task('deploy-airdrop', 'Generate the merkle root and deploy')
	.addParam('rewardtoken', 'The address of the reward token')
	.addParam('emergencyreceiver', 'The address of the emergency receiver')
	.addParam('bonusstart', 'timestamp for bonus start')
	.addParam('weeksbonusduration', 'number of weeks for the bonus to run')
	.addParam('weeksemergency', 'number of weeks after the bonus ends for the emergency to be enabled')
	.setAction(async (taskArg) => {
		const {deploy} = require('./deploy/deploy');
		await deploy(
			taskArg.rewardtoken,
			taskArg.emergencyreceiver,
			taskArg.bonusstart,
			taskArg.weeksbonusduration,
			taskArg.weeksemergency);
	});
task('deploy-airdrop-test', 'Generate the merkle root and deploy')
	.addParam('rewardtoken', 'The address of the reward token')
	.addParam('emergencyreceiver', 'The address of the emergency receiver')
	.addParam('bonusstart', 'timestamp for bonus start')
	.addParam('weeksbonusduration', 'number of weeks for the bonus to run')
	.addParam('weeksemergency', 'number of weeks after the bonus ends for the emergency to be enabled')
	.setAction(async (taskArg) => {
		const {deploy_test} = require('./deploy/deploy');
		await deploy_test(
			taskArg.rewardtoken,
			taskArg.emergencyreceiver,
			taskArg.bonusstart,
			taskArg.weeksbonusduration,
			taskArg.weeksemergency);
	});

// Some of the settings should be defined in `./config.js`.
// Go to https://hardhat.org/config/ for the syntax.
const cfg: HardhatUserConfig = {
	solidity: {
		version: "0.7.3",
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},

	defaultNetwork: 'hardhat',
	networks: config.networks,
	etherscan: config.etherscan,

	contractSizer: {
		alphaSort: true,
		runOnCompile: true,
		disambiguatePaths: false
	},
	gasReporter: {
		currency: "USD",
		gasPrice: 51,
		enabled: process.env.REPORT_GAS == "true" ? true : false,
		coinmarketcap: process.env.CMC_API_KEY
	}
};

export default cfg;
