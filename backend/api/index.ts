import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

console.log("1. LAMBDA WAKING UP...");

const expressApp = express();
let appInitialized = false;

async function bootstrap() {
  if (!appInitialized) {
    console.log("2. STARTING NESTJS BOOTSTRAP...");
    try {
      const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
      app.enableCors();
      app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
      
      console.log("3. INITIALIZING APP (WAITING FOR FIREBASE/DB)...");
      await app.init();
      appInitialized = true;
      console.log("4. NESTJS READY!");
    } catch (error) {
      console.error("FATAL ERROR DURING BOOTSTRAP:", error);
      throw error;
    }
  }
}

export default async (req: any, res: any) => {
  console.log(`5. INCOMING REQUEST: ${req.method} ${req.url}`);
  try {
    await bootstrap();
    console.log("6. FORWARDING TO EXPRESS...");
    expressApp(req, res);
  } catch (error: any) {
    console.error("ERROR CAUGHT IN HANDLER:", error);
    res.status(500).json({ 
      message: 'Internal Server Error (Caught)', 
      error: error?.message || 'Unknown Error' 
    });
  }
};
