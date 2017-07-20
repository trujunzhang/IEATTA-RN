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
    users: User;
    restaurant: Restaurant;
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
    id: string;
    url: string;
    displayName: string;
    slug: string;
    thumbnailUrl: string;
    updatedAt: Date;
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
        id: map.id,
        recordType: map.get('recordType'),
        recordId: map.get('recordId'),
        // Date
        createdAt: map.get('createdAt'),
        updatedAt: map.get('updatedAt'),
        // Point
        event: map.get('event') && fromParseEvent(map.get('event')),
        restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
        recipe: map.get('recipe') && fromParseRecipe(map.get('recipe')),
        photo: map.get('photo') && fromParsePhoto(map.get('photo')),
        peopleInEvent: map.get('peopleInEvent') && fromParsePeopleInEvent(map.get('peopleInEvent'))
    }
}

export function fromParseUser(map: Object): User {
    return {
        id: map.id,
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
        id: map.id,
        url: map.get('url'),
        original: map.get('original') && fromParseFile(map.get('original')),
        thumbnail: map.get('thumbnail') && fromParseFile(map.get('thumbnail')),
        photoType: map.get('photoType'),
        // point(2)
        // restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
        // recipe: map.get('recipe') && fromParseRecipe(map.get('recipe'))
    }
}

export function fromParseRecipe(map: Object): Recipe {
    return {
        id: map.id,
        displayName: map.get('displayName'),
        price: map.get('price')
    };
}


export function fromParseEvent(map: Object): Event {
    return {
        id: map.id,
        displayName: map.get('displayName'),
        slug: map.get('slug'),
        start: map.get('start'),
        end: map.get('end'),
        want: map.get('want'),
        restaurant: map.get('restaurant') && fromParseRestaurant(map.get('restaurant')),
        users: (map.get('users') || []).map(fromParseUser)
    };
}

export function fromParseRestaurant(map: Object): Restaurant {
    return {
        id: map.id,
        displayName: map.get('displayName'),
        address: map.get('address'),
        geoLocation: map.get('geoLocation'),
        updatedAt: map.get('updatedAt'),
        // Pointer
        reviews: (map.get('reviews') || []),
    };
}


