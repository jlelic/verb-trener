import Cookies from 'cookies'
import dbClient from './mongodb'
import {ObjectID} from 'bson'

export default async function getLoggedInUser(req) {
    const cookies = Cookies(req)
    const sid = cookies.get('sid')
    if(!sid) {
        return null
    }
    const client = await dbClient
    const db = client.db('norsk')
    const sessions = db.collection('sessions')
    const session = await sessions.findOne({_id: ObjectID(sid)})
    if(!session) {
        return null
    }
    const users = db.collection('users')
    const user = await users.findOne({_id: ObjectID(session.user)})
    return {
        _id: user._id.toString(),
        name: user.name,
        fullName: user.fullName
    }
}
