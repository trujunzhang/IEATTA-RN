const Parse = require('parse/react-native')
import moment from 'moment'

const {writeParseRecord, ConfigureService, RestaurantService} = require('../realmApi').default

const {getRecordsParameters} = require('../parseUtiles').default

const {fromParseRecord} = require('../parseModels')
/**
 * The states were interested in
 */
const {
    PARSE_ORIGINAL_IMAGES,
    PARSE_THUMBNAIL_IMAGES,
    PARSE_RECORDS
} = require('../../lib/constants').default

const {getLocalImagePath} = require('../fsApi')
const RNFS = require('react-native-fs')
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


export async function saveRecord(record, index) {
    if (record.recordType === "photo") {
        let photo = record.photo;
        if (!!photo.original.url) {
            await RNFS.downloadFile({
                fromUrl: photo.original.url,
                toFile: getLocalImagePath(photo.id, PARSE_ORIGINAL_IMAGES)
            }).promise.then(() => {

            }).catch(err => {
                debugger
            })
        }
        if (!!photo.thumbnail.url) {
            await RNFS.downloadFile({
                fromUrl: photo.thumbnail.url,
                toFile: getLocalImagePath(photo.id, PARSE_THUMBNAIL_IMAGES)
            }).promise.then(() => {
            }).catch(err => {
                debugger
            })
        }
    }
    writeParseRecord(record)
    ConfigureService.saveLastRecordUpdatedAt(record.updatedAt)
}

/**
 * Thist method just used for test.
 * @returns {Promise.<*>}
 */
async function getMoviesFromApi() {
    try {
        debugger
        let response = await fetch('https://facebook.github.io/react-native/movies.json');
        let responseJson = await response.json();
        debugger
        return responseJson.movies;
    } catch (error) {
        console.error(error);
    }
}

export async function pullFromServer(countPerTime, lastRecordUpdatedData) {
    const recordsQuery = getRecordsParameters({lastUpdatedAt: lastRecordUpdatedData})
    let results = await recordsQuery.limit(countPerTime).find()
    let records = (results || []).map(fromParseRecord)
    // debugger

    for (let i = 0; i < records.length; i++) {
        await saveRecord(records[i], i)
    }
}



