import serverless from "serverless-http";
import app from "../../TwitterCloneApi/app";
export const handler = serverless(app);
