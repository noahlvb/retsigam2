class AbstractWorker {
    constructor () {
        setInterval(function () {
            this.handle()
        }.bind(this), this.getInterval() * 1000);
    }
}

module.exports = AbstractWorker
