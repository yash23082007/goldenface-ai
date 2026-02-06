import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // MongoDB Driver 4.0+ handles these automatically
      // but we can specify for explicitness
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Create TTL index for auto-deletion of scans after 7 days
    mongoose.connection.on('connected', () => {
      console.log('📊 Database indexes will be created automatically');
    });

    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
