const Parse = require('parse/react-native')
import moment from 'moment'

let {ParsePost, ParseUser} = require('../objects').default

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
export default class PushToServer {
    constructor(countPerTime) {
        this.countPerTime = countPerTime
    }

    start() {

    }

}


