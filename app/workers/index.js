const fs = require('fs')

const workers = fs.readdirSync('./app/workers')

workers.forEach(function (worker) {
    if (worker !== 'AbstractWorker.js' && worker !== 'index.js') {
        new (require('./' + worker))()
    }
})
