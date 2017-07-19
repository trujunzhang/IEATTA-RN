'use strict'

const repository = require('../parse/realmObjects').default
console.log(repository.path)

const Records = require('../lib/records').default

const RNFS = require('react-native-fs')

/**
 * The states were interested in
 */
const {
    PARSE_CONFIGURE,
    PARSE_RESTAURANTS,
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_EVENTS,
    PARSE_RECIPES,
    PARSE_PHOTOS,
    PARSE_REVIEWS,
} = require('../lib/constants').default


export function getLocalImagePath(id, type) {
    return `${RNFS.DocumentDirectoryPath}/${id}_${type}.jpg`;
}
