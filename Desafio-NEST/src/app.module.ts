import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  // imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService],
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://matubianchi:123456@cluster0.u37xyzn.mongodb.net/testNest',
    ),
  ],
})
export class AppModule {}
