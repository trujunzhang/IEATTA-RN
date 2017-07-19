const Parse = require('parse/react-native')
import moment from 'moment'

const {writeParseRecord, ConfigureService, RestaurantService} = require('../realmApi').default

const {getRecordsParameters} = require('../parseUtiles').default

const {fromParseRecord} = require('../parseModels')
/**
 * The states were interested in
 */
const {
    PARSE_RECORDS
} = require('../../lib/constants').default

const {getLocalImagePath} = require('../fsApi')
/**
 * How to sync the data between the local and the server parse.
 *   @note: Because if the objects had been saved, it's updatedData will be changed.
 *          Using the object called record to record the updated information.
 *
 * Step1:
 *    pull the records updated are more than the last record updatedData.
 *
 * Step2:
 *   Push the records saved in the local database.
 *   @note: These records will be pull again next scheduled task.
 */
export default class ParsePhotoAccess {
    constructor() {
    }

    async downloadPhotoImages(cachePhoto) {
        const {id, originalUrl, thumbnailUrl} = cachePhoto

        // Random file name needed to force refresh...
        // const downloadDest = `${RNFS.DocumentDirectoryPath}/${((Math.random() * 1000) | 0)}.jpg`;
        const downloadDest = getLocalImagePath(id, 'orginal')

        const ret = RNFS.downloadFile({
            fromUrl: url,
            toFile: downloadDest,
            begin,
            progress,
            background,
            progressDivider
        });
    }

}


