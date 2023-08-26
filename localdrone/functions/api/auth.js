import * as Realm from "realm-web";
import bcrypt from 'bcryptjs';

export async function onRequest(context) {
  async function mongoClient() {
    const id = "localdrone-oajxf";
    const config = {
        id,
      };
    const app = new Realm.App(config);
    const credentials = Realm.Credentials.apiKey(context.env.MONGODB_APIKEY);
    const user = await app.logIn(credentials);
    const mongo = user.mongoClient("mongodb-atlas");

    return mongo;
  }

  async function verifyAuth(authEmail, authPass) {
    const mongo = await mongoClient();
    const collection = mongo.db("localdrone").collection("users");
    const query = { email: authEmail };
    const projection = { email: 1, password: 1 };
    const user = await collection.findOne(query, { projection });

    if (user === null) {
      return false, 'user not found';
    }
    const match = await bcrypt.compare(authPass, user.password);

    if(match) {
      return true, null;
    } else {
      return false, 'invalid password';
    }
  }

  const authorizationHeader = context.request.headers.get("Authorization");
  const message = {};
  if (authorizationHeader) {
    const [authType, authToken] = authorizationHeader.split(" ");

    if (authType === "Basic") {
      const decodedToken = atob(authToken);
      const [authEmail, authPass] = decodedToken.split(":");
      
      const [result, err] = await verifyAuth(authEmail, authPass);
      message = {status: result, err: err};
    } else {
      message = {status: false, err: 'invalid auth method'};
    }
  } else {
    message = {status: false, err: 'missing auth header'};
  }

  const json = JSON.stringify(message, null, 2);
  console.log(json);
  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}