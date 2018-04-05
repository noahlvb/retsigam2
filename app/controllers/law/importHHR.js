const fs = require('fs');

module.exports = function (req, res) {
    console.log(req.file)
    res.redirect('/law')
}
