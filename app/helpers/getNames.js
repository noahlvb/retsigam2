module.exports = function (peopleString) {
    let people = peopleString.split(',')
    for (person in people) {
        people[person] = people[person].replace(/ /g,'')
    }

    return people
}
