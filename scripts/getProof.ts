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
[0xd236f4d4925555a8f682d16d88e9dd7d23282146eaef7965049828af73553de5,0xdda3a8fab4cfeaf37911c60f52a44a7448553eb77b78bd2cb1d73909411d9d6d,0x2936dbd82146b3eab8a05ef701486d24c79ed1cd97e3ee32e12b573ad6f0a8ea,0x13be574afd1772f6412a7c65d20edb31d7497ec15d486fd3c5808c4974ca2ca0,0x2a70f036617658502570d00870c30d9550ec93da57f94b415284950e39db545e,0x51e173b8dc22696533205326c018bc58e4a6d8d3aae05c85cf8aa160829f221a,0x7524cd22bfb1885814f4d6fa498cd43d53cdfdf6699ffec21dd7b24a0cfa1ee6,0xf504c6e517a2c23f3d0a50f5ceca16bd8b291b54a73f81e280c780443b173f34,0x15d08f672544ad0097d9baa752566e4ab5b6bd6b87b728938912ebc0129f84fd,0x087826fbaaa7f19836ad3fcc41e1691c8c1e8ca5df1b15e240ed2b73651ddcc1,0xf047a58802cfa855817f8529eefe8aaeb794c0c99a551402314c8a00e1f72352]
