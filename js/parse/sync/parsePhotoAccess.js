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

export default class ParsePhotoAccess {
    constructor() {
    }

    async downloadPhotoImages(cachePhoto) {
        const {id, originalUrl, thumbnailUrl} = cachePhoto

        // Random file name needed to force refresh...
        // const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;
        const downloadDest = getLocalImagePath(id, 'orginal')

        debugger
        const ret = RNFS.downloadFile({
            fromUrl: originalUrl,
            toFile: downloadDest
        })

        debugger
    }

}


