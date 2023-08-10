import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

const id = "localdrone-oajxf";

const config = {
    id,
  };// replace this with your App ID

const app = new Realm.App(config);

const credentials = Realm.Credentials.apiKey();

const user = await app.logIn(credentials);

const mongo = app.currentUser.mongoClient("mongodb-atlas");

const collection = mongo.db("localdrone").collection("users");

const localdroneUsers = await collection.find({});

const json = JSON.stringify(localdroneUsers, null, 2);

console.log(json);

//const json = JSON.stringify(collection, null, 2);

//console.log(json);
