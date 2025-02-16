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

    it("should not allow a user with expired sub", async function (){
        await subscription.connect(addr1).startSubscription({value: fee});
        await ethers.provider.send("evm_increaseTime", [24*60*60]);
        await ethers.provider.send("evm_mine", []);
        expect(await subscription.isSubscriptionActive(addr1)).to.equal(false)
    })

    it("should cancel and refund a subscription", async function(){
        await subscription.connect(addr1).startSubscription({value: fee});
        const balanceBefore = await ethers.provider.getBalance(addr1);
        await ethers.provider.send("evm_increaseTime", [0.5*24*60*60]);
        await ethers.provider.send("evm_mine", []);

        await subscription.connect(addr1).cancelSubscription(addr1);
        const balanceAfter = await ethers.provider.getBalance(addr1);
        expect(await subscription.isSubscriptionActive(addr1)).to.equal(false);
        expect(balanceAfter).to.be.gt(balanceBefore);
    })

    it("should emit when user takes action", async function(){
        await subscription.connect(addr1).startSubscription({value: fee});
        await ethers.provider.send("evm_increaseTime", [0.5*24*60*60]);
        await ethers.provider.send("evm_mine", []);

        await expect(subscription.connect(addr1).cancelSubscription(addr1))
            .to.emit(subscription, "SubscriptionCancelled")
            .withArgs(addr1.address);
    })
})