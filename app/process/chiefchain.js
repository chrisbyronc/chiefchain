"use strict"

const CryptoJS = require("crypto-js");

module.exports = class ChiefChain {
    constructor(index, timestamp, data, previousHash) {

        this.index = index;
        //Currently testing, working on special key to increment with. This will do for now
        this.key = CryptoJS.SHA3("The one and only, Chief. Coming soon... Chief's Pizza!", { outputLength: 512 });
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash || '';
        
    }

    hash() {
        return  CryptoJS.SHA3(
            this.index.toString() + 
            this.key.toString() +
            this.timestamp.toString() +
            this.data.toString() +
            this.previousHash.toString()
            , { outputLength: 512 });
    }

    generateNextBlock(previousBlock, newData) {
        var newIndex = previousBlock.index + 1;
        var nextTimestamp = new Date().toUTCString();
        var previousHash = previousBlock.hash();

        // console.log('p', previousHash.toString());
    
        var nextHash = new ChiefChain(newIndex, nextTimestamp, newData, previousHash);
    
        return nextHash;
    }

    checkValidity(newBlock, previousBlock) {
        // console.log('s', previousBlock.hash().toString());
        // console.log('2', newBlock.previousHash.toString());
        if (previousBlock.index + 1 !== newBlock.index) {
            console.log('Wrong index for ', newBlock);
            return false;
        } else if(newBlock.previousHash.toString() !== previousBlock.hash().toString()) {
            console.log('Incorrect hash for ', newBlock);
            return false;
        } 
    
        return true;
    }
}
