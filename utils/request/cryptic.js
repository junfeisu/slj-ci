import crypto from 'crypto'

const cryptic = input => crypto.createHash('sha1')
        .update(input)
        .digest('hex')

export default cryptic
