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
    PARSE_PEOPLE_IN_EVENTS
} = require('./constants').default

const {
    ConfigureSchema, RecordSchema,
    UserSchema, PeopleInEventSchema,
    RestaurantSchema, EventSchema, RecipeSchema,
    PhotoSchema, ReviewSchema
} = require('../parse/realmObjects').default

const Records = {}

Records.realmObjects = {
    'record': {parseObject: PARSE_RECORDS, realmSchema: RecordSchema},
    'restaurant': {parseObject: PARSE_RESTAURANTS, realmSchema: RestaurantSchema},
    'event': {parseObject: PARSE_EVENTS, realmSchema: EventSchema},
    'peopleInEvent': {parseObject: PARSE_PEOPLE_IN_EVENTS, realmSchema: PeopleInEventSchema},
    'user': {parseObject: PARSE_USERS, realmSchema: UserSchema},
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
        case PARSE_PEOPLE_IN_EVENTS:
            debugger
            return {
                objectId: object.id
            }
        case PARSE_USERS:
            return {}
        case PARSE_RECORDS:
            return {}
        case PARSE_EVENTS:
            return {
                objectId: object.id,
                displayName: object.displayName,
                start: object.start,
                end: object.end,
                want: object.want
            }
        case PARSE_RECIPES:
            return {
                objectId: object.id,
                displayName: object.displayName,
                price: object.price
            }

        case PARSE_PHOTOS:
            // debugger
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
