const Parse = require('parse/react-native')
import moment from 'moment'

const {writeParseRecord, RestaurantService} = require('../realmApi').default

const {getRecordsParameters} = require('../parseUtiles').default

const {fromParseRecord} = require('../../reducers/parseModels')
/**
 * The states were interested in
 */
const {
    PARSE_RECORDS
} = require('../../lib/constants').default

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
    constructor(countPerTime, lastRecordUpdatedData) {
        this.lastRecordUpdatedData = lastRecordUpdatedData
        this.countPerTime = countPerTime
    }

    async start() {
        const recordsQuery = getRecordsParameters({lastUpdatedAt: this.lastRecordUpdatedData})
        let results = await recordsQuery.limit(this.countPerTime).find()
        let records = (results || []).map(fromParseRecord)
        records.map((record, index) => {
            writeParseRecord(record)
        })
    }

}


