const AbstractWorker = require('./AbstractWorker')

class NewSchoolmeetingWorker extends AbstractWorker {
    getInterval () {
        return 2
    }

    handle () {
        console.log('new shcoolmeeting');
    }
}

module.exports = NewSchoolmeetingWorker
