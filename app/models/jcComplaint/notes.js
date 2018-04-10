module.exports = function (notes, callback) {
    this.notes = notes

    this.save(function (err) {
        callback(null)
    })
}