var CryptoJS = require("crypto-js");

module.export = class ChiefChain {
    constructor() {
        super();
    }
    Chain(index, key, timestamp, data, previousHash) {
        //WIP
    }
}

function ChiefChain(index, key, timestamp, data, previousHash) {
    this.index = index;
    this.key = key;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash || '';
    
    this.hash = function(self){
        var hsh = CryptoJS.SHA3(
            self.index.toString() + 
            self.key.toString() +
            self.timestamp.toString() +
            self.data.toString() +
            self.previousHash.toString()
            , { outputLength: 512 });

        return hsh;
    }
}

var generateNextBlock = function(previousBlock, newData) {
    var newIndex = previousBlock.index + 1;
    var nextTimestamp = new Date().toUTCString();
    var previousHash = previousBlock.hash(previousBlock);

    var nextHash = new ChiefChain(newIndex, keyHash, nextTimestamp, newData, previousHash);

    return nextHash;
}

var getGenesis = function(date) {
    var Chain = new ChiefChain(14, keyHash, date, '');

    return Chain;
}

var checkValidity = function(newBlock, previousBlock) {
    if (previousBlock.index + 1 !== newBlock.index) {
        console.log('Wrong index for ', newBlock);
        return false;
    } else if(newBlock.previousHash.toString() !== previousBlock.hash(previousBlock).toString()) {
        console.log('Incorrect hash for ', newBlock);
        return false;
    } 

    return true;
}

//Currently testing, will move and change key as this is updated.
var keyHash = CryptoJS.SHA3("The one and only, Chief. Coming soon... Chief's Pizza!", { outputLength: 512 });

//just for test creation
var blockCountLimit = 42;

runBlockChain = function() {
    var date = new Date().toUTCString();
    var nextBlock = getGenesis(date);

    var previousBlocks = [];
    previousBlocks.push(nextBlock);

    
    for(var i = 0; i <= blockCountLimit; i++) {
        if(previousBlocks[0] !== nextBlock) {
            if (checkValidity(nextBlock, previousBlocks[i - 1]) ) {
                previousBlocks.push(nextBlock);
                console.log('Block ' + i + ' has appended. \n');
                
                console.log('Block ' + nextBlock.hash(nextBlock) + '\n' );

                console.log(nextBlock);
            }
        } else {
            console.log('Block ' + i + ' has appended. \n');
            
            console.log('Block ' + nextBlock.hash(nextBlock) + '\n' );
        }

        var nextBlock = generateNextBlock(previousBlocks[i], "Test data " + i)
        
    }
    
}

runBlockChain();