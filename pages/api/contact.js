import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Champ(s) invalide(s)." });
      return;
    }

    // store in db
    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${
      process.env.MONGODB_PASSWORD
    }@${process.env.MONGODB_CLUSTERNAME}.doal4ct.mongodb.net/${
      process.env.NODE_ENV === "production"
        ? process.env.MONGODB_DATABASE_PROD
        : process.env.MONGODB_DATABASE_DEV
    }`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "Connexion à la DB impossible." });
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res
        .status(500)
        .json({ message: "Echec de l'ajout du message dans la DB." });
      return;
    }

    client.close();

    res.status(201).json({
      message: "Message enregistré en base avec succès.",
      message: newMessage,
    });
  }
}

export default handler;
