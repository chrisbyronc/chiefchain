/*
* Initial Chain file
*
*
*/
"use strict";
var ChiefChain = require('../process/chiefchain.js');

module.exports = function(app, db) {
  function getGenesis(date) {
    var Chain = new ChiefChain(14, date, '');

    return Chain;
  }

  app.post('/chain', (req, res) => {
    
    var date = new Date().toUTCString();
    // res.send(ChiefChain);
    var nextBlock = getGenesis(date);

    var previousBlocks = [];
    previousBlocks.push(nextBlock);

    //@todo correct limit
    for(var i = 0; i <= 42; i++) {
        if(previousBlocks[0] !== nextBlock) {
            if (nextBlock.checkValidity(nextBlock, previousBlocks[i - 1]) ) {
                previousBlocks.push(nextBlock);
                // console.log('Block ' + i + ' has appended. \n');
                
                // console.log('Block ' + nextBlock.hash(nextBlock) + '\n' );

                // console.log(nextBlock);
            }
        } 
        // else {
            // console.log('Block ' + i + ' has appended. \n');
            
            // console.log('Block ' + nextBlock.hash(nextBlock) + '\n' );
        // }

        nextBlock = nextBlock.generateNextBlock(previousBlocks[i], "Test data " + i)
        
    }
    
    res.send(previousBlocks);
  });
};
