import {ethers} from "hardhat";
import {expect} from "chai";
import {Sub} from "../typechain-types/Sub";


describe("sub contract", function (){
    let subscription: Sub;;
    let owner: any;
    let addr1: any;

    const fee = ethers.parseEther("0.01");

    beforeEach(async function(){
        [owner, addr1] = await ethers.getSigners();

        const Sub = await ethers.getContractFactory("Sub");
        subscription = await Sub.deploy(fee);
        await subscription.waitForDeployment();
    })

    it("should set the right subscription fee", async function(){
        expect(await subscription.fee()).to.equal(fee);
    });

    it("should allow a user to subscribe", async function(){
        await subscription.connect(addr1).startSubscription({value: fee});
        const exp = await subscription.subscriptions(addr1.address);
        expect(exp).to.be.approximately(Math.round((Date.now() + 24*60*60*1000)/1000), 100);
    });
})