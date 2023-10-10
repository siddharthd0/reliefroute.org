import { MongoClient, ObjectId } from 'mongodb';
import nodemailer from 'nodemailer';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { locationId, email } = req.body;
    try {
      // Connect to MongoDB
      const client = await MongoClient.connect(process.env.MONGODB);
      const db = client.db();
      const collection = db.collection('safeHavens');

      // Convert locationId to ObjectId
      const objectId = new ObjectId(locationId);

      // Update isVerified status
      await collection.updateOne({ _id: objectId }, { $set: { isVerified: 'True' } });

      // Send verification email
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: '"War Help App" <hr@techoptimum.org>',
        to: email,
        subject: 'Safe Haven Verification',
        text: 'Your safe haven has been verified. If you need to update your information, please email us as soon as possible.',
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);  // Log error to console
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end();  // Method Not Allowed
  }
};
