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
        objectId: 'string',
        recordType: 'string',
        recordId: 'string'
    }
}

class UserSchema extends Realm.Object {
}

UserSchema.schema = {
    name: PARSE_USERS,
    properties: {
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
        objectId: 'string',
        displayName: 'string',
        address: 'string',
        url: 'string',
        // photos: {type: 'list', objectType: PARSE_PHOTOS},
    }
}

class EventSchema extends Realm.Object {
}

EventSchema.schema = {
    name: PARSE_EVENTS,
    properties: {
        objectId: 'string',
        displayName: 'string',
        start: 'string',
        end: 'string',
        want: 'string'
        // users: User;
        // restaurant: Restaurant;
    }
}

class RecipeSchema extends Realm.Object {
}

RecipeSchema.schema = {
    name: PARSE_RECIPES,
    properties: {
        make: 'string',
        model: 'string',
        miles: {type: 'int', default: 0},
    }
}

class PhotoSchema extends Realm.Object {
}

PhotoSchema.schema = {
    name: PARSE_PHOTOS,
    properties: {
        objectId: 'string',
        photoType: 'string',
        url: 'string'
    }
}

class ReviewSchema extends Realm.Object {
}

ReviewSchema.schema = {
    name: PARSE_REVIEWS,
    properties: {
        make: 'string',
        model: 'string',
        miles: {type: 'int', default: 0},
    }
}


export default new Realm({
    schema: [
        ConfigureSchema, RecordSchema,
        UserSchema,
        RestaurantSchema, EventSchema, RecipeSchema,
        PhotoSchema, ReviewSchema
    ]
})



