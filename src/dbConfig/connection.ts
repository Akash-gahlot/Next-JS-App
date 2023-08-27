 import mongoose from "mongoose";
// import mongoose from '@types/mongoose';
//u7lOrTtb86y1APsX
const MONGO_DB_URL = "mongodb+srv://akashgahlot1926:u7lOrTtb86y1APsX@cluster0.fxxam3z.mongodb.net/";
export async function connectDb(){
    try{ 
       await mongoose.connect(MONGO_DB_URL);
const connection = mongoose.connection;
connection.on("connected", () => {
    console.log("Mongo DB Connected successfully");
});
connection.on('error', (err) => {
    console.log("Some error while connecting to DB : " + err);
});
    }
    catch (err) { 
        console.log("Connection error :"+err);
    }

};
