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

const ParsePhotoAccess = require('./parsePhotoAccess')

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
export default class PullFromServer {
    constructor() {
    }

    async start(countPerTime, lastRecordUpdatedData) {
        const recordsQuery = getRecordsParameters({lastUpdatedAt: lastRecordUpdatedData})
        let results = await recordsQuery.limit(countPerTime).find()
        let records = (results || []).map(fromParseRecord)
        // debugger

        records.map((record, index) => {
            writeParseRecord(record)
            if (record.recordType === "photo") {
                const photo = record.photo;
                const cachePhoto = {
                    id: photo.id,
                    originalUrl: photo.original.url,
                    thumbnailUrl: photo.thumbnail.url
                }
                new ParsePhotoAccess().downloadPhotoImages(cachePhoto)
                debugger
            }
            ConfigureService.saveLastRecordUpdatedAt(record.updatedAt)
        })
    }

}


