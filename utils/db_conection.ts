import mongoose from 'mongoose';
import { env } from "../utils/env"

type conection = {
    isConnected: number
}

const connection: conection = {
    isConnected: 0
}

let currentEnvironment: string;
currentEnvironment = env('MONGO_URL');


const connectMongo = async () => {
    if (connection.isConnected) {
        return
    }
    const db = await mongoose.connect(currentEnvironment);
    connection.isConnected = db.connections[0].readyState
}

export default connectMongo;
