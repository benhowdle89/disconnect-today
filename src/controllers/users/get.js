import services from './../../services/'
const { Users } = services

const get = {
    async getByFacebookId({ facebook_id }) {
        const users = new Users()
        const user = await users.getByFacebookId(facebook_id)
        return {
            user
        }
    },
    async getById({ id }) {
        const user = await users.getById(id)
        return {
            user
        }
    }
}

export default get
