import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

export async function onRequest(context) {
    const id = "localdrone-oajxf";
    
    const config = {
        id,
      };// replace this with your App ID

    const app = new Realm.App(config);

    const credentials = Realm.Credentials.apiKey(context.env.MONGODB_APIKEY);

    const user = await app.logIn(credentials);

    const mongo = app.currentUser.mongoClient(DATA_SOURCE_NAME);

    const collection = mongo.db("localdrone").collection("users");

    const json = JSON.stringify(collection, null, 2);
    
    return new Response(json, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
}