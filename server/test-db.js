require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const db = mongoose.connection.db;
    console.log(`Current Database: ${db.databaseName}`);
    
    const collections = await db.listCollections().toArray();
    console.log('Collections in current DB:', collections.map(c => c.name));
    
    const adminDb = db.admin();
    const result = await adminDb.listDatabases();
    
    for (const d of result.databases) {
      if (d.name === 'admin' || d.name === 'local') continue;
      
      const currentDb = db.client.db(d.name);
      const collections = await currentDb.listCollections().toArray();
      
      for (const c of collections) {
        const coll = currentDb.collection(c.name);
        const docs = await coll.find({ branch: "IT" }).toArray();
        if (docs.length > 0) {
           console.log(`Found docs in Database: ${d.name}, Collection: ${c.name}`);
           console.log(JSON.stringify(docs, null, 2));
        }
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

testConnection();
