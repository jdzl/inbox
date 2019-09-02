const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const HEX = "0x";
const provider = new HDWalletProvider(
  "mnemonic 12 words here rigth now tree force apple red alt gr",
  //   "https://rinkeby.infura.io/orDImgKRzwNrVCDrAK5Q"
  "https://rinkeby.infura.io/v3/ddd333efb4ae455f9097a58a2fc45be8"
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const Inbox = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: HEX + bytecode, arguments: ["Fuck you"] })
      .send({ gas: "1000000", from: accounts[0] });

    console.log("Contract deployed to ", Inbox.options.address);
  } catch (error) {
    console.log(error);
  }
};
deploy();