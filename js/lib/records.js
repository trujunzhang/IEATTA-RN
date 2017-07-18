let _ = require('underscore')


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
} = require('./constants').default

const {RecordSchema, UserSchema, RestaurantSchema, EventSchema, RecipeSchema, PhotoSchema, ReviewSchema} = require('../parse/realmObjects').default

const Records = {}

Records.realmObjects = {
    'restaurant': {parseObject: PARSE_RESTAURANTS, realmSchema: RestaurantSchema},
    'user': {parseObject: PARSE_USERS, realmSchema: UserSchema},
    'record': {parseObject: PARSE_RECORDS, realmSchema: RecordSchema},
    'event': {parseObject: PARSE_EVENTS, realmSchema: EventSchema},
    'recipe': {parseObject: PARSE_RECIPES, realmSchema: RecipeSchema},
    'photo': {parseObject: PARSE_PHOTOS, realmSchema: PhotoSchema},
    'review': {parseObject: PARSE_REVIEWS, realmSchema: ReviewSchema},
}

/**
 * @summary
 * @param {Object} parseObject
 * @param object
 */
Records.getRealmData = function (parseObject, object) {
    switch (parseObject) {
        case PARSE_RESTAURANTS:
            return {
                objectId: object.id,
                displayName: object.displayName,
                address: object.address,
                // geoLocation: object.geoLocation,
                //photos: object.photos,
                //reviews: object.reviews,
                url: object.url
            }
        case PARSE_USERS:
            return {}
        case PARSE_RECORDS:
            return {}
        case PARSE_EVENTS:
            return {}
        case PARSE_RECIPES:
            return {}
        case PARSE_PHOTOS:
            debugger
            return {
                objectId: object.id,
                photoType: object.photoType,
                url: object.url
            }
        case PARSE_REVIEWS:
            return {}
    }
}

export default Records
