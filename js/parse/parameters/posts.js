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

export default class PostsParameters {
  constructor(query: Parse.Query) {
    this.query = query
  }

  addParameters(terms: Any) {
    if (terms.userProfileType) {
      let userId = terms.userId
      if (typeof userId === 'undefined') {
        throw new Error('You need to set a proper User Id before query posts')
      }
      switch (terms.userProfileType) {
        case USERPROFILE_TYPE_UPVOTE:
          this.query.containedIn('upvoters', [ParseUser.createWithoutData(userId)])
          break
        case USERPROFILE_TYPE_DOWNVOTE:
          this.query.containedIn('downvoters', [ParseUser.createWithoutData(userId)])
          break
        case USERPROFILE_TYPE_SUBMITTED_POSTS:

          break
        case USERPROFILE_TYPE_FOLDER_LIST:

          break
      }
    }

    if (terms.related) { // related posts
      // this.query.notContainedIn('objectId', terms.related.id)
      // this.query.equalTo('author', terms.related.author)
    }

    if (terms.before && terms.after) { // Calendar posts

      let mAfter = moment(terms.after, 'YYYY-MM-DD')
      let startOfDay = mAfter.startOf('day')

      // from the start of the date (inclusive)
      this.query.greaterThanOrEqualTo('postedAt', startOfDay.toDate())

      let mBefore = moment(terms.before, 'YYYY-MM-DD')
      let endOfDay = mBefore.endOf('day')

      // till the start of tomorrow (non-inclusive)
      this.query.lessThan('postedAt', endOfDay.toDate())
    }

    if (terms.domain) {
      this.query.equalTo('sourceFrom', terms.domain)
    }

    if (terms.author) {
      this.query.equalTo('author', terms.author)
    }

    return this
  }

  end() {
    return this.query
  }

}


