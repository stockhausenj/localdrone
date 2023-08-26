import * as Realm from "realm-web";

const {
  BSON: { ObjectId },
} = Realm;

export async function onRequest(context) {
  const authorizationHeader = context.request.headers.get("Authorization");

  if (authorizationHeader) {
    const [authType, authToken] = authorizationHeader.split(" ");

    if (authType === "Basic") {
      // You might want to decode the base64 encoded token if needed
      const decodedToken = atob(authToken);
      console.log("Basic token:", decodedToken);
      const [authEmail, password] = decodedToken.split(":");
      
      console.log("Email:", authEmail);
      console.log("Password:", password);
    }
  }

  /*
  const id = "localdrone-oajxf";
  
  const config = {
      id,
    };

  const app = new Realm.App(config);

  const credentials = Realm.Credentials.apiKey(context.env.MONGODB_APIKEY);

  const user = await app.logIn(credentials);

  const mongo = user.mongoClient("mongodb-atlas");

  const collection = mongo.db("localdrone").collection("users");

  const query = { email: authEmail };

  const account = await userCollection.findOne(query);

  const projection = { username: 1, zipcode: 1, missionsCompleted: 1, lastLogin: 1 };

  const localdroneUsers = await collection.find({}, { projection });

  const json = JSON.stringify(localdroneUsers, null, 2);
  
  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
  */
  const data = {
    hello: "world",
  };

  const json = JSON.stringify(data, null, 2);

  return new Response(json);
}