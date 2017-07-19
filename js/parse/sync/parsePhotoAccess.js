const Parse = require('parse/react-native')
import moment from 'moment'

/**
 * The states were interested in
 */
const {
    PARSE_RECORDS
} = require('../../lib/constants').default

const {getLocalImagePath} = require('../fsApi')
const RNFS = require('react-native-fs')

export function downloadOriginalPhotoImages(cachePhoto) {
    // const {id, originalUrl, thumbnailUrl} = cachePhoto
    RNFS.downloadFile({
        fromUrl: cachePhoto.originalUrl,
        toFile: getLocalImagePath(id, 'orginal'),
        background: false
    }).promise.then(res => {
        debugger
    }).catch(err => {
    });
}

