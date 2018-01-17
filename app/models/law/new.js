module.exports = function (newLaw, callback) {
    for (field in newLaw) {
        if (newLaw[field] === '' || newLaw[field] === null || newLaw[field] === undefined) {
            callback('notAllFields')
        }
    }

    let document = {
        number: newLaw.number,
        content: newLaw.content,
        enabled: true
    }

    new this(document).save(function (err, document) {
        if (err) {
            callback('dubbleNumber')
        }

        callback(null, document.number)
    })
}
