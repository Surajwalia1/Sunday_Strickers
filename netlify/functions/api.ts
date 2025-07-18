import serverless from "serverless-http";
import { createServer } from "../../server";
import { Handler } from "@netlify/functions";
import { connectToDatabase } from "../../server/config/database";

const handler: Handler = async (event, context) => {
  try {
    // Ensure database connection is established
    await connectToDatabase();
    
    // Convert Express app to serverless function
    const serverlessHandler = serverless(createServer());
    return await serverlessHandler(event, context);
  } catch (error) {
    console.error("Netlify function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};

export { handler };
