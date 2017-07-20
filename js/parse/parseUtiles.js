const Parse = require('parse/react-native')

const Parameters = require('./parameters').default

const {ParsePost, ParseRecord, ParseUser} = require('./objects').default


/**
 * The states were interested in
 */
const {
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_POSTS,
    PARSE_REVIEWS,
} = require('../lib/constants').default

function getQueryByType(type: string = PARSE_POSTS) {
    switch (type) {
        case PARSE_RECORDS:
            return new Parse.Query(ParseRecord).include('photo').include('restaurant').include('event').include('recipe')
        case PARSE_POSTS:
            return new Parse.Query(ParsePost).include('photos')
        case PARSE_USERS:
            return new Parse.Query(ParseUser)
    }

}

function getRestaurantParameters(terms) {
    return new Parameters.Posts(getQueryByType())
        .addParameters(terms)
        .end()
}

function getUsersParameters(terms) {
    return new Parameters.Users(getQueryByType(PARSE_USERS))
        .addParameters(terms)
        .end()
}

function getRecordsParameters(terms) {
    return new Parameters.Records(getQueryByType(PARSE_RECORDS))
        .addParameters(terms)
        .end()
}

export default {
    getQueryByType,
    getRestaurantParameters,
    getUsersParameters,
    getRecordsParameters
}
