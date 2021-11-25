// run with
// npx hardhat run ./scripts/getProof.ts
import { ethers } from "hardhat";
import BalanceTree from "../src/balance-tree";
import airdrop_test from "./airdrop-test.json";

async function main() {
	// Change the file with addresses for other proofs
	const airdropAccounts = airdrop_test.map((drop) => ({
		account: drop.address,
		amount: ethers.utils.parseEther(drop.earnings.toString()),
	}));

	const tree = new BalanceTree(airdropAccounts);
	const proof = tree.getProof(2, "0x0dfd159661118064daecbf283b4851fafac4eb94", ethers.utils.parseEther("300000"));

	console.log("Proof:", proof);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
