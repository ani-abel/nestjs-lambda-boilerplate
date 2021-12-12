import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/get-values')
  getArrayValues(): string[] {
    return this.appService.getArrayValues();
  }

  @Get('/health-check')
  healthCheck(@Res() res: any): void {
    const healthcheck = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };
    try {
      res.send(healthcheck);
    } catch (ex) {
      healthcheck.message = ex;
      res.status(503).send();
    }
  }

  // @Post('/upload-file')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: MulterValidators.editFileName,
  //     }),
  //   }),
  // )
  // async uploadFile(
  //   @UploadedFile() uploadedFile: Express.Multer.File,
  // ): Promise<any> {
  //   const filePath = `uploads/${uploadedFile.filename}`;
  //   // return await this.appSrv.loadDocxMetadata(filePath);
  // }
}
