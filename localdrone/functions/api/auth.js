import * as Realm from "realm-web";
import bcrypt from 'bcryptjs';
import { ResetTvOutlined, TurnedIn } from "@mui/icons-material";

const {
  BSON: { ObjectId },
} = Realm;

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
    const mongo = mongoClient();
    const collection = mongo.db("localdrone").collection("users");
    const query = { email: authEmail };
    const projection = { email: 1, password: 1 };
    const user = await collection.findOne(query, { projection });
    console.log(user);
    const match = await bcrypt.compare(authPass, user.password);
    console.log(match);

    if(match) {
      return true;
    } else {
      return false;
    }
  }

  const authorizationHeader = context.request.headers.get("Authorization");
  const message = {result: 'fail'};
  if (authorizationHeader) {
    const [authType, authToken] = authorizationHeader.split(" ");

    if (authType === "Basic") {
      const decodedToken = atob(authToken);
      const [authEmail, authPass] = decodedToken.split(":");
      
      validAuth = await verifyAuth(authEmail, authPass);
      message.result = validAuth;
    }
  }

  const json = JSON.stringify(message, null, 2);
  
  return new Response(json, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  });
}