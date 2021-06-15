// test with
// yarn test ./test/airdrop.test.ts

import { ethers } from "hardhat";
import { Signer } from "ethers";
import { MerkleDistributor } from "../typechain/MerkleDistributor";
import { XYZ } from "../typechain/XYZ";
import { expect } from "chai";
import BalanceTree from "../src/balance-tree";
import airdrop from "../scripts/airdrop-test.json";
import { BigNumber } from "ethers";

const calculateTotalAirdrop = (accounts: any) => {
	return accounts.reduce(
		(accumulator: any, currentValue: any) => accumulator.add(currentValue.amount),
		BigNumber.from(0)
	);
};

describe("Token", function () {
	let accounts: Signer[];

	let token: XYZ;
	let tree: BalanceTree;
	const ECOSYSTEM = "0x2D5AB5A00b78093f1ce41B9355043aB670A9A92A";

	const START = 1623173126; // 6/8/2021, 11:25:26 AM
	const END = 1633742726; // 2021-10-08 19:25:26
	const EMERGENCY_TIMEOUT = 1636421126; //2021-11-08 19:25:26
	const TIME_SKIP = 1633742726 - 100; // Amount of time to skip, right now is almost at the end of the rewards

	let merkle: MerkleDistributor;
	let account0: string;
	let account1: string;

	const airdropAccounts = airdrop.map((drop) => ({
		account: drop.address,
		amount: ethers.utils.parseEther(drop.earnings.toString()),
	}));

	beforeEach(async function () {
		accounts = await ethers.getSigners();
	});

	it("should deploy contract", async () => {
		//These addreses where added to the airdrop-test.json
		account0 = await accounts[0].getAddress();
		account1 = await accounts[1].getAddress();

		tree = new BalanceTree(airdropAccounts);
		const root = tree.getHexRoot();
		const totalAllocatedAirdrop = calculateTotalAirdrop(airdropAccounts);

		const XYZContract = await ethers.getContractFactory("XYZ");
		token = await XYZContract.deploy();

		const MekleDistributor = await ethers.getContractFactory("MerkleDistributor");
		merkle = await MekleDistributor.deploy(
			token.address,
			root,
			airdropAccounts.length,
			totalAllocatedAirdrop,
			START,
			END,
			EMERGENCY_TIMEOUT,
			ECOSYSTEM
		);

		// sends XYZ to the distributor
		await token.mint(merkle.address, ethers.utils.parseEther("80000000"));
	});

	it("should set constructor values", async () => {
		const ctoken = await merkle.token();
		const cmerkleRoot = await merkle.merkleRoot();
		const ctotalClaims = await merkle.totalClaims();
		const cinitialPoolSize = await merkle.initialPoolSize();
		const cbonusStart = await merkle.bonusStart();
		const cbonusEnd = await merkle.bonusEnd();
		const cemergencyTimeout = await merkle.emergencyTimeout();
		const totalAllocatedAirdrop = calculateTotalAirdrop(airdropAccounts);
		expect(ctoken).eq(token.address);
		expect(cmerkleRoot).eq(tree.getHexRoot());
		expect(ctotalClaims).eq(airdropAccounts.length);
		expect(cinitialPoolSize).eq(totalAllocatedAirdrop);
		expect(cbonusStart).eq(START);
		expect(cbonusEnd).eq(END);
		expect(cemergencyTimeout).eq(EMERGENCY_TIMEOUT);
	});

	it("should have valid claims", async () => {
		let claim = await merkle.isClaimed(0);
		expect(claim).to.eq(false);
		claim = await merkle.isClaimed(1);
		expect(claim).to.eq(false);
	});

	it("should allow to claim", async () => {
		// Time skips uncomment to allow a time skip
		// await ethers.provider.send("evm_increaseTime", [TIME_SKIP]);
		// await ethers.provider.send("evm_mine", []);

		const proof0 = tree.getProof(0, account0, ethers.utils.parseEther("200000"));

		await expect(merkle.claim(0, account0, ethers.utils.parseEther("200000"), proof0)).to.emit(
			merkle,
			"Claimed"
		);

		const proof1 = tree.getProof(1, account1, ethers.utils.parseEther("200000"));
		await expect(
			merkle.connect(accounts[1]).claim(1, account1, ethers.utils.parseEther("200000"), proof1)
		).to.emit(merkle, "Claimed");

		// expect first claimer to have less bonus
		const balance0 = await token.balanceOf(account0);
		expect(balance0.lt(ethers.utils.parseEther("200000")));
		console.log(
			"🚀 ~ file: airdrop.test.ts ~ line 112 ~ it ~ balance0",
			ethers.utils.formatEther(balance0)
		);

		//	expect last claimer to greater bonus
		const balance1 = await token.balanceOf(account1);
		console.log(
			"🚀 ~ file: airdrop.test.ts ~ line 115 ~ it ~ balance1",
			ethers.utils.formatEther(balance1)
		);
		expect(balance1.gt(ethers.utils.parseEther("200000")));
	});

	it("should have invalid claims", async () => {
		let claim = await merkle.isClaimed(0);
		expect(claim).to.eq(true);
		claim = await merkle.isClaimed(1);
		expect(claim).to.eq(true);
	});
});
