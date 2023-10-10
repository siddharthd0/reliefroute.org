import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const client = await MongoClient.connect(process.env.MONGODB);
  const db = client.db();
  const safeHavenCollection = db.collection('safeHavens');

  switch (req.method) {
    case 'GET': {
      try {
        const safeHavens = await safeHavenCollection.find().toArray();
        res.status(200).json(safeHavens);
      } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve safe havens.' });
      }
      break;
    }
    case 'POST': {
      try {
        const data = req.body;
        await safeHavenCollection.insertOne(data);
        res.status(201).json({ message: 'Safe haven added!' });
      } catch (error) {
        res.status(500).json({ message: 'Failed to add safe haven.' });
      }
      break;
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

  await client.close();
}
