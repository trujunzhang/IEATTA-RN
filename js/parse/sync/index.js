const Parse = require('parse/react-native')
import moment from 'moment'

let {ParsePost, ParseUser} = require('../objects').default

const PushToServer = require('./push_to_server').default
const {pullFromServer} = require('./pull_from_server')

const {ConfigureService} = require('../realmApi').default

const RECORDS_COUNT_PUSH = 15
const RECORDS_COUNT_PULL = 15

/**
 * The states were interested in
 */
const {
    USERPROFILE_TYPE_UPVOTE,
    USERPROFILE_TYPE_DOWNVOTE,
    USERPROFILE_TYPE_SUBMITTED_POSTS,
    USERPROFILE_TYPE_FOLDER_LIST
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
export default class AsyncParse {
    constructor() {
        this.lastRecordUpdatedData = ConfigureService.getLastRecordUpdatedAt()
        this.mPushToServer = new PushToServer(RECORDS_COUNT_PUSH)
    }

    getLastUpdatedAt() {
        return null
    }

    async startScheduledTask() {
        await pullFromServer(RECORDS_COUNT_PULL, this.lastRecordUpdatedData)
        console.log("scheduled Task...")
    }
}


