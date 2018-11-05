var Web3 = require('web3');
var web3 = new Web3();
var util = require('ethereumjs-util');

var ganache = require("ganache-cli");

// Use Ganache
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));


const msg = new Buffer('hello');
// Sign
const sig = web3.eth.sign(web3.eth.accounts[0], '0x' + msg.toString('hex'));

const res = util.fromRpcSig(sig);

// To check the sign prefix it with Ethereim Signed Message as below
// IN Accoordance with https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
const prefix = new Buffer("\x19Ethereum Signed Message:\n");
// Final Message has to be keeccak256 hash 
const prefixedMsg = util.keccak256(
  Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
);

// use the keeckak hash and the signature to verify
const pubKey  = util.ecrecover(prefixedMsg, res.v, res.r, res.s);
//Address Buffer
const addrBuf = util.pubToAddress(pubKey);
// Buffer to Hex String
const addr    = util.bufferToHex(addrBuf);
// Note that the two are same
console.log(web3.eth.accounts[0],  addr);
