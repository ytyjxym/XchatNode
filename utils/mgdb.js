const mongodb = require("mongodb");
const mongoCt = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

let mgdb = ({ dbName, collectionName, url }) => {
    return new Promise((resolve, reject) => {
        dbName = dbName || "XYM";
        url = url || "mongodb://127.0.0.1:27017";
        mongoCt.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, (err, client) => {
            if (!err) {
                const db = client.db(dbName);
                // db.createCollection(collectionName)
                const collection = db.collection(collectionName);
                resolve({ client, collection, ObjectID });
            } else {
                reject(err);
            }
        })
    })
}
module.exports = mgdb