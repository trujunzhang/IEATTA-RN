'use strict'

const RNFS = require('react-native-fs')

/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES
} = require('../lib/constants').default

export function configureImageFolder() {
    const originalFold = `${RNFS.DocumentDirectoryPath}/${PARSE_ORIGINAL_IMAGES}`
    const thumbnailFold = `${RNFS.DocumentDirectoryPath}/${PARSE_THUMBNAIL_IMAGES}`

    console.log(originalFold)
    console.log(thumbnailFold)

    RNFS.mkdir(originalFold)
    RNFS.mkdir(thumbnailFold)
}

export function getLocalImagePath(id, type) {
    return `${RNFS.DocumentDirectoryPath}/${type}/${id}.jpg`;
}

export async function getLocalImageUri(id, type) {
    const path = `${RNFS.DocumentDirectoryPath}/${type}/${id}.jpg`;

    // debugger
    let exist = false;
    await RNFS.exists(path).then((isExist) => {
        exist = isExist;
    })

    // debugger
    if (exist) {
        return {uri: 'file://' + path};
    }
    return null;
}
