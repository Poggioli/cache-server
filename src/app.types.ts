import { IsNumber, IsObject, IsString } from 'class-validator';

export class CacheRequestDTO {
  @IsString()
  key: string;

  @IsObject()
  data: object;

  @IsNumber()
  ttl: number;
}
