import {ethers} from "hardhat";
async function main(){
    const fee = ethers.parseEther("0.01")
    const Subscription = await ethers.deployContract("Sub", [fee]);
    await Subscription.waitForDeployment();
    console.log("Subscription successfull deployed", Subscription.target)

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error("Error deploying contract", error);
        process.exit(1);
    });