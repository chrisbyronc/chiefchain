/*
* Initial Chain file
*
*
*/

module.exports = function(app, db) {
  app.post('/chain', (req, res) => {
    res.send('nothing');
  });
};
