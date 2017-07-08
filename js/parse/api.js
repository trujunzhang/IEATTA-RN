'use strict'

const Parse = require('parse/react-native')

let {ParseRecord, ParsePost} = require('./objects').default

import type {Action, ThunkAction} from '../actions/types'


async function queryRecords(limit: int): Promise {

    return await new ParseFolder(data).save()
}


export default {
    queryRecords,
}