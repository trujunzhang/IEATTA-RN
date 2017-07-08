'use strict'

const repository = require('../parse/realmObjects').default
console.log(repository.path)

const Records = require('../lib/records').default

/**
 * The states were interested in
 */
const {
    PARSE_RESTAURANTS,
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_EVENTS,
    PARSE_RECIPES,
    PARSE_PHOTOS,
    PARSE_REVIEWS,
} = require('../lib/constants').default


function writeParseRecord(record) {
    const object = record[record.recordType]
    const {parseObject, realmSchema} = Records.realmObjects[record.recordType]

    if (repository.objects(parseObject).filtered('objectId == $0', object.id).length) return // Exist

    repository.write(() => {
        repository.create(parseObject, Records.getRealmData(parseObject, object))
    })

}


let RestaurantService = {
    findAll: function (sortBy) {
        return repository.objects(PARSE_RESTAURANTS)
    },

    save: function (item) {
        if (repository.objects(PARSE_RESTAURANTS).filtered('objectId == $0', item.id).length) return;
        repository.write(() => {
            repository.create(PARSE_RESTAURANTS, Records.getRealmData(PARSE_RESTAURANTS, item))
        })
    },

    update: function (todo, callback) {
        if (!callback) return;
        repository.write(() => {
            callback();
            todo.updatedAt = new Date();
        })
    }
}


export default {
    writeParseRecord,
    RestaurantService,
}