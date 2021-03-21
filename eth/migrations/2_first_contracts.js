// 2_first_contracts.js
const profile = artifacts.require("profile");

module.exports = function(deployer) {
  deployer.deploy(profile);
};