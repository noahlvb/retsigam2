const AbstractWorker = require('./AbstractWorker')

const schoolmeeting = require('./../models/schoolmeeting');

class NewSchoolmeetingWorker extends AbstractWorker {
    getInterval () {
        return 60
    }

    handle () {
        let currentDate = new Date()

        function getNextSchoolmeetingDate(date, dayOfWeek, hours, minutes) {
            let resultDate = new Date(date.getTime());

            let newDate = date.getDate() + (7 + dayOfWeek - date.getDay()) % 7
            if (date.getDate() == newDate) {
                newDate += 7
            }

            resultDate.setDate(newDate);
            resultDate.setHours(hours)
            resultDate.setMinutes(minutes)
            resultDate.setSeconds(0)
            resultDate.setMilliseconds(0)

            return resultDate;
        }

        schoolmeeting.findOne().sort({ 'created_at': -1 }).exec(function (err, document) {
            if (!document || currentDate.toDateString() == document.datetime.toDateString()) {
                new schoolmeeting({
                    datetime: getNextSchoolmeetingDate(currentDate, 0, 13, 0),
                    location: 'Weet ik het waar',
                    type: 'regular'
                }).save()
            }
        })
    }
}

module.exports = NewSchoolmeetingWorker
