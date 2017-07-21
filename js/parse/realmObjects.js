const Realm = require('realm')


/**
 * The states were interested in
 */
const {
    PARSE_CONFIGURE,
    PARSE_RESTAURANTS,
    PARSE_USERS,
    PARSE_RECORDS,
    PARSE_EVENTS,
    PARSE_PEOPLE_IN_EVENTS,
    PARSE_RECIPES,
    PARSE_PHOTOS,
    PARSE_REVIEWS,
} = require('../lib/constants').default


class ConfigureSchema extends Realm.Object {
}
ConfigureSchema.schema = {
    name: PARSE_CONFIGURE,
    properties: {
        objectId: 'string',
        lastRecordUpdatedAt: 'date'
    }
}

class RecordSchema extends Realm.Object {
}
RecordSchema.schema = {
    name: PARSE_RECORDS,
    properties: {
        // Basic Fields
        objectId: 'string',
        createdAt: 'date',
        updatedAt: 'date',
        // Attributes
        recordType: 'string',
        recordId: 'string'
    }
}

class UserSchema extends Realm.Object {
}

UserSchema.schema = {
    name: PARSE_USERS,
    properties: {
        // Basic Fields
        objectId: 'string',
        updatedAt: 'date',
        // Attributes
        loginType: 'string',
        displayName: 'string',
        email: 'string'
    }
}

class RestaurantSchema extends Realm.Object {
}

RestaurantSchema.schema = {
    name: PARSE_RESTAURANTS,
    properties: {
        // Basic Fields
        objectId: 'string',
        updatedAt: 'date',
        // Attributes
        displayName: 'string',
        // Location
        address: 'string',
        latitude: 'double',
        longitude: 'double',
        geoHash: 'string',

        // Photos
        listPhotoId: 'string',
        localPhotoStatus: 'bool'
    }
}

class EventSchema extends Realm.Object {
}

EventSchema.schema = {
    name: PARSE_EVENTS,
    properties: {
        // Basic Fields
        objectId: 'string',
        updatedAt: 'date',
        // Attributes
        displayName: 'string',
        start: 'string',
        end: 'string',
        want: 'string',
        // Pointer
        restaurantId: 'string'
    }
}


class PeopleInEventSchema extends Realm.Object {
}

PeopleInEventSchema.schema = {
    name: PARSE_PEOPLE_IN_EVENTS,
    properties: {
        // Basic Fields
        objectId: 'string',
        updatedAt: 'date',
        // Attributes
    }
}


class RecipeSchema extends Realm.Object {
}

RecipeSchema.schema = {
    name: PARSE_RECIPES,
    properties: {
        // Basic Fields
        objectId: 'string',
        updatedAt: 'date',
        // Attributes
        displayName: 'string',
        price: 'string',
    }
}

class PhotoSchema extends Realm.Object {
}

PhotoSchema.schema = {
    name: PARSE_PHOTOS,
    properties: {
        // Basic Fields
        objectId: 'string',
        updatedAt: 'date',
        // Attributes
        photoType: 'string',
        // Pointer
        restaurantId: 'string',
        recipeId: 'string'
    }
}

class ReviewSchema extends Realm.Object {
}

ReviewSchema.schema = {
    name: PARSE_REVIEWS,
    properties: {
        // Basic Fields
        objectId: 'string',
        updatedAt: 'date',
        // Attributes
        make: 'string',
    }
}


export default new Realm({
    schema: [
        ConfigureSchema, RecordSchema,
        UserSchema, PeopleInEventSchema,
        RestaurantSchema, EventSchema, RecipeSchema,
        PhotoSchema, ReviewSchema
    ]
})



