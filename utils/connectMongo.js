import mongoose from 'mongoose'
const dbConection = mongoose.connection

const connectMongo = () => {
  let dbName = process.env.NODE_ENV === 'test' ? 'sljTest' : 'sljCi'
  mongoose.connect('mongodb://localhost/' + dbName, {
    useNewUrlParser: true
  })

  dbConection.on('error', console.error.bind(console, `connection mongodb ${dbName} fail:`))
  dbConection.on('open', () => console.log('mongodb connection has been established'))
}

export default connectMongo
