module.exports = function (email, emailConfirm, callback) {
    email = email.toLowerCase()
    emailConfirm = emailConfirm.toLowerCase()

    let re = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

    if (email !== emailConfirm) {
        return callback('notSame')
    }

    if (!re.test(email)) {
        console.log(re.test(email));
        return callback('invalid')
    }

    this.email = email
    this.save()
    callback()
}
