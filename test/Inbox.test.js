const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");
let accounts;
let Inbox;
const INITIAL_MESSAGE = "fuck yourself";
beforeEach(async () => {
  // GET a list of all acounts
  accounts = await web3.eth.getAccounts();

  Inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_MESSAGE]
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("should deploy a contract", () => {
    assert.ok(Inbox.options.address);
  });
  it("should  has default message", async () => {
    assert.equal(await Inbox.methods.message().call(), INITIAL_MESSAGE);
  });
  it("should can change  message", async () => {
    await Inbox.methods.setMessage("server").send({ from: accounts[0] });

    assert.equal(await Inbox.methods.message().call(), "server");
  });
});
