import * as Realm from "realm-web";
import jwt from 'jsonwebtoken';
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

  async function verifyAuth(authEmail, authPass, response) {
    const mongo = await mongoClient();
    const collection = mongo.db("localdrone").collection("users");
    const query = { email: authEmail };
    const projection = { email: 1, username: 1, password: 1 };
    const user = await collection.findOne(query, { projection });

    if (user === null) {
      response.err = 'user not found';
      return response;
    }
    const match = await bcrypt.compare(authPass, user.password);

    if(match) {
      const tokenExpiration = Math.floor(Date.now() / 1000) + (60 * 60); // 1 hour in seconds
      const jwtPayload = {
        sub: user.email, // Subject (user identifier)
        username: user.username,
        exp: tokenExpiration // Expiration time
      };
      const jwToken = jwt.sign(jwtPayload, context.env.JWT_SECRET);
      response.jwt = jwToken;
      response.status = true;
      return response;
    } else {
      response.err = 'invalid password';
      return response;
    }
  }

  const authorizationHeader = context.request.headers.get("Authorization");
  let message = {'status': false, 'jwt': null, 'err': null};
  if (authorizationHeader) {
    const [authType, authToken] = authorizationHeader.split(" ");

    if (authType === "Basic") {
      const decodedToken = atob(authToken);
      const [authEmail, authPass] = decodedToken.split(":");
      
      message = await verifyAuth(authEmail, authPass, message);
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