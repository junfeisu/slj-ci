import mongoose from 'mongoose'
const Schema = mongoose.Schema

const repositorySchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Object,
    required: true
  },
  private: {
    type: String,
    required: false
  },
  ssh_url: {
    type: String,
    required: true,
  },
  default_branch: {
    type: String,
  },
  type: {
    type: String,
    default: 'github'
  }
}, {versionKey: false})

repositorySchema.index({id: 1, type: 1}, {unique: true})

export default mongoose.model('Repository', repositorySchema)
