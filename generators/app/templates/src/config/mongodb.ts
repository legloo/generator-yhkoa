// MongoDB connection options
export const mongo = {
  options: {
    // useMongoClient: true
    useNewUrlParser:true,
    useUnifiedTopology: true
  },
  uri: process.env.MONGODB_URI ||
  process.env.MONGOHQ_URL ||
  process.env.OPENSHIFT_MONGODB_DB_URL +
  process.env.OPENSHIFT_APP_NAME ||
  'mongodb://localhost/server'
}