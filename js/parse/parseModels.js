let slugify = require('slugify')
const _ = require('underscore')


export type Pointer = {
    id: string
}

export type File = {
    url: string
}

export type Record = {
    id: string;
    recordType: string;
    recordId: string;
    createdAt: date;
    updatedAt: date;
    // Point
    event: Event;
    restaurant: Restaurant;
    recipe: Recipe;
    photo: Photo;
}

export type User = {
    id: string,
    name: string,
    loginType: string,
    email: string,
    slug: string,

    upvotedPosts: Array<string>, // PostId array
    downvotedPosts: Array<string>, // PostId array
    upvotedComments: Array<string>, // commentId array
    downvotedComments: Array<string>, // commentId array
}

export type PeopleInEvent = {
    id: string;
}

export type Photo = {
    id: string;
    original: string;
    thumbnail: string;
    url: string;
    photoType: string;
}

export type Event = {
    id: string;
    displayName: string;
    start: string;
    end: string;
    want: string;
    restaurantId: string;
}

export type Recipe = {
    id: string;
    displayName: string;
    price: string;
    // Point
    photos: Array<Photo>;
    restaurant: Restaurant;
    event: Event;
}

export type Restaurant = {
    // Basic Fields
    id: string;
    createdAt: Date;
    updatedAt: Date;
    // Attributes
    url: string;
    displayName: string;
    slug: string;
    thumbnailUrl: string;
    reviews: Array,
};

export function fromParsePointer(map: Object): Pointer {
    return {
        id: map.id,
    }
}

export function fromParseFile(map: Object): File {
    return {
        name: map._name,
        url: map._url,
    }
}

export function fromParsePeopleInEvent(map: Object): PeopleInEvent {
    return {
        id: map.id
    }
}

export function fromParseRecord(map: Object): Record {
    return {
        // Basic Fields
        id: map.id,
        createdAt: map.get('createdAt'),
        updatedAt: map.get('updatedAt'),
        // Attributes
        recordType: map.get('recordType'),
        recordId: map.get('recordId'),
        // Pointer
        event: map.get('event') && fromParseEvent(map.get('event')),
        restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
        recipe: map.get('recipe') && fromParseRecipe(map.get('recipe')),
        photo: map.get('photo') && fromParsePhoto(map.get('photo')),
        peopleInEvent: map.get('peopleInEvent') && fromParsePeopleInEvent(map.get('peopleInEvent'))
    }
}

export function fromParseUser(map: Object): User {
    return {
        // Basic Fields
        id: map.id,
        createdAt: map.get('createdAt'),
        updatedAt: map.get('updatedAt'),
        // Attributes
        name: map.get('username'),
        slug: map.get('slug'),
        loginType: map.get('loginType'),
        email: map.get('email'),

        upvotedPosts: _.pluck((map.get('upvotedPosts') || []).map(fromParsePointer), 'id'),
        downvotedPosts: _.pluck((map.get('downvotedPosts') || []).map(fromParsePointer), 'id'),
        upvotedComments: _.pluck((map.get('upvotedComments') || []).map(fromParsePointer), 'id'),
        downvotedComments: _.pluck((map.get('downvotedComments') || []).map(fromParsePointer), 'id')
    }
}

export function fromParsePhoto(map: Object): Photo {
    return {
        // Basic Fields
        id: map.id,
        createdAt: map.get('createdAt'),
        updatedAt: map.get('updatedAt'),
        // Attributes
        url: map.get('url'),
        original: map.get('original') && fromParseFile(map.get('original')),
        thumbnail: map.get('thumbnail') && fromParseFile(map.get('thumbnail')),
        photoType: map.get('photoType'),
        // point(2)
        restaurantId: map.get('restaurant') && map.get('restaurant').id,
        recipeId: map.get('recipe') && map.get('recipe').id
    }
}

export function fromParseRecipe(map: Object): Recipe {
    return {
        // Basic Fields
        id: map.id,
        createdAt: map.get('createdAt'),
        updatedAt: map.get('updatedAt'),
        // Attributes
        displayName: map.get('displayName'),
        price: map.get('price')
    }
}


export function fromParseEvent(map: Object): Event {
    return {
        // Basic Fields
        id: map.id,
        createdAt: map.get('createdAt'),
        updatedAt: map.get('updatedAt'),
        // Attributes
        displayName: map.get('displayName'),
        slug: map.get('slug'),
        start: map.get('start'),
        end: map.get('end'),
        want: map.get('want'),
        // Pointer
        restaurantId: map.get('restaurant') && map.get('restaurant').id
    }
}

function _get_default_image_for_restaurant(map) {
    const photos = map.get('photos') || []

    // debugger
    if (photos.length > 0) {
        return photos[0].id;
    }
    return '';
}

export function fromParseRestaurant(map: Object): Restaurant {
    return {
        // Basic Fields
        id: map.id,
        createdAt: map.get('createdAt'),
        updatedAt: map.get('updatedAt'),
        // Attributes
        displayName: map.get('displayName'),
        address: map.get('address'),
        geoLocation: map.get('geoLocation'),
        // Photos
        listPhotoId: _get_default_image_for_restaurant(map),
        // Pointer
        reviews: (map.get('reviews') || [])
    }
}


