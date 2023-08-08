export async function onRequest(context) {
  try {
    // Get data from MongoDB
    const data = await getDataFromMongoDB(context);
    // Do something with the data or return it as a response
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Error occurred: " + error.message, { status: 500 });
  }
}

async function getDataFromMongoDB(context) {
  const mongoURI = context.env.MONGODB_URI; // Access the MongoDB connection string from the environment variable
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("users"); // Replace "your-collection-name" with the name of your MongoDB collection
    const queryResult = await collection.find({}).toArray();
    return queryResult;
  } finally {
    client.close();
  }
}