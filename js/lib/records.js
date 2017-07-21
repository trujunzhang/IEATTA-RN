const _ = require('underscore')

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

const {encodeGeoHash} = require('../components/vendor/GeoHash')

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
                // Basic Fields
                objectId: object.id,
                updatedAt: object.updatedAt,
                // Attributes
                displayName: object.displayName,
                // Location
                address: object.address,
                latitude: object.geoLocation.latitude,
                longitude: object.geoLocation.longitude,
                geoHash: encodeGeoHash(object.geoLocation.latitude, object.geoLocation.longitude),
                // Photos
                listPhotoId: object.listPhotoId || '',
                localPhotoStatus: false
            }
        case PARSE_PEOPLE_IN_EVENTS:
            return {
                // Basic Fields
                objectId: object.id,
                // updatedAt: object.updatedAt,
                // Attributes
            }
        case PARSE_USERS:
            return {}
        case PARSE_RECORDS:
            return {}
        case PARSE_EVENTS:
            return {
                // Basic Fields
                objectId: object.id,
                updatedAt: object.updatedAt,
                // Attributes
                displayName: object.displayName,
                start: object.start,
                end: object.end,
                want: object.want,
                // Pointer
                restaurantId: object.restaurantId || ''
            }
        case PARSE_RECIPES:
            return {
                // Basic Fields
                objectId: object.id,
                updatedAt: object.updatedAt,
                // Attributes
                displayName: object.displayName,
                price: object.price
            }
        case PARSE_PHOTOS:
            // debugger
            return {
                // Basic Fields
                objectId: object.id,
                updatedAt: object.updatedAt,
                // Attributes
                photoType: object.photoType,
                // Pointer
                restaurantId: object.restaurantId || '',
                recipeId: object.recipeId || ''
            }
        case PARSE_REVIEWS:
            return {
                // Basic Fields
                objectId: object.id,
                updatedAt: object.updatedAt,
                // Attributes
            }
    }
}

export default Records
