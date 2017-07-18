const Parse = require('parse/react-native')
import moment from 'moment'

let {ParsePost, ParseUser} = require('../objects').default

const PushToServer = require('./push_to_server').default
const PullFromServer = require('./pull_from_server').default

const {ConfigureService} = require('../realmApi').default

const RECORDS_COUNT_PUSH = 20
const RECORDS_COUNT_PULL = 20

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
        this.mPullFromServer = new PullFromServer(RECORDS_COUNT_PULL, this.lastRecordUpdatedData)
    }

    getLastUpdatedAt() {
        return null
    }

    async startScheduledTask() {
        await this.mPullFromServer.start()
        console.log("scheduled Task...")
    }
}


