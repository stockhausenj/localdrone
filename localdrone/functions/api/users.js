import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

export async function onRequest(context) {
    const id = "localdrone-oajxf";
    
    const config = {
        id,
      };

    const app = new Realm.App(config);

    const credentials = Realm.Credentials.apiKey(context.env.MONGODB_APIKEY);

    const user = await app.logIn(credentials);

    const mongo = user.mongoClient("mongodb-atlas");

    const collection = mongo.db("localdrone").collection("users");

    const projection = { username: 1, zipcode: 1, missionsCompleted: 1, lastLogin: 1 };

    const localdroneUsers = await collection.find({}, { projection });

    const json = JSON.stringify(localdroneUsers, null, 2);
    
    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
}