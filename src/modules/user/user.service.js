const uploadFile = require("../../utils/storage");
const CRUD = require("../crud.factory");
const UserModel = require("./user.model");

class UserService extends CRUD {
  async buyNFT(userId, nftId) {
    const user = await this.Model.findById(userId);
    const nft = await NFTService.get(nftId);
    if (user.balance < nft.price) {
      throw new Error("Insufficient balance");
    }
    user.balance -= nft.price;

    user.nfts.push(nftId);
    await user.save();
    return { user, nft };
  }

  async deposit(userId, amount) {
    const user = await this.Model.findById(userId);
    // Use absolute amount to avoid negative balance
    user.balance += Math.abs(amount);
    user.oldBalance = user.balance;
    await user.save();
    return user;
  }

  async withdraw(userId, amount) {
    const user = await this.Model.findById(userId);
    // Check if balance is greater than amount to withdraw
    if (user.balance < amount) {
      throw new Error("Insufficient balance");
    }
    // Use absolute amount to avoid negative balance
    user.balance -= Math.abs(amount);
    user.oldBalance = user.balance;

    await user.save();
    return user;
  }

  async changeProfit(userId, amount) {
    const user = await this.Model.findById(userId);
    user.profit += amount;
    user.oldProfit = user.profit;
    await user.save();

    return user;
  }

  async getUserProfile(userId) {}
  async updateUserPhoto(userId, file) {
    // this
    // Make a call to the storage server to upload the file with the storage service
    // Then update the user with the new photo url

    const response = await uploadFile(file, "photo");
    console.log(response.data);
    const user = await this.update(userId, { photo: response.data.url });
  }
  async updateUserProfile(userId, data) {
    // this
    const user = await this.update(userId, data);
    return user;
  }
}

module.exports = new UserService(UserModel, "User");
