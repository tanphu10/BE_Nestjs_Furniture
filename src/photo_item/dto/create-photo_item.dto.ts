import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { Observable } from "rxjs";

export class CreatePhotoItemDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  item_id: number;
  @ApiProperty({ type: String, format: "binary" })
  photo_1: string;
  @ApiProperty({ type: String, format: "binary" })
  photo_2: string;
  @ApiProperty({ type: String, format: "binary" })
  photo_3: string;
  @ApiProperty({ type: String, format: "binary" })
  photo_4: string;
  @ApiProperty({ type: String, format: "binary" })
  photo_5: string;
}

export class FileDataReq {
  @ApiProperty()
  id: number;
  @ApiProperty()
  item_id : number;
  @ApiProperty({ type: String, format: "binary" })
  files: Express.Multer.File[];
 
}

export class FileDataRes {
  urls: string[];
  id: number;
  
}

@Injectable()
export class FileExtender implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    req.file['comment'] = req.body.comment;
    req.file['outletId'] = Number(req.body.outletId);
    return next.handle();
  }
}