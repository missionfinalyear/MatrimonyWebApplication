// 2_first_contracts.js
const profile = artifacts.require("profile");
const chat = artifacts.require("chat");
const likeprofile = artifacts.require("likedprofile");
const payment = artifacts.require("Payment");
const passwordReset = artifacts.require("PasswordReset")

module.exports = function(deployer) {
  deployer.deploy(profile);
  deployer.deploy(chat);
  deployer.deploy(likeprofile);
  deployer.deploy(payment);
  deployer.deploy(passwordReset);
};