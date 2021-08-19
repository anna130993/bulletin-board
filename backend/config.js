const dbURI = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://anna130993:${process.env.dbpass}@cluster0.jq4ob.mongodb.net/bulletinBoard?retryWrites=true&w=majority`
  : 'mongodb://localhost:27017/bulletinBoard';

const imgURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000';

module.exports = {dbURI, imgURL};
