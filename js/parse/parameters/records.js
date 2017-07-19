const Parse = require('parse/react-native')
import moment from 'moment'

let {ParseRecord, ParseUser} = require('../objects').default

/**
 * The states were interested in
 */
const {
    USERPROFILE_TYPE_UPVOTE,
    USERPROFILE_TYPE_DOWNVOTE,
    USERPROFILE_TYPE_SUBMITTED_POSTS,
    USERPROFILE_TYPE_FOLDER_LIST
} = require('../../lib/constants').default

export default class RecordsParameters {
    constructor(query: Parse.Query) {
        this.query = query.ascending("updatedAt")
    }

    addParameters(terms: Any) {

        if (!!terms.lastUpdatedAt) { // related posts
            // debugger
            // this.query.notContainedIn('objectId', terms.related.id)
            this.query.greaterThan('updatedAt', terms.lastUpdatedAt)
        }

        return this
    }

    end() {
        return this.query
    }

}


