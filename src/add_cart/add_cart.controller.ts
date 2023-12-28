import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { AddCartService } from "./add_cart.service";
import { CreateAddCartDto } from "./dto/create-add_cart.dto";
import { UpdateAddCartDto } from "./dto/update-add_cart.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("api")
@ApiTags("add-cart")
export class AddCartController {
  constructor(private readonly addCartService: AddCartService) {}

  @Post("add-cart")
  create(@Body() createAddCartDto: CreateAddCartDto) {
    return this.addCartService.create(createAddCartDto);
  }

  @Get("add-cart")
  findAll() {
    return this.addCartService.findAll();
  }

  @Get("add-cart/user/:id")
  findOne(@Param("id") id: string) {
    return this.addCartService.findUser(+id);
  }

  @Patch("add-cart")
  update(
    @Query("id") id: number,
    @Body() updateAddCartDto: UpdateAddCartDto
  ) {
    return this.addCartService.update(+id, updateAddCartDto);
  }

  @Delete("add-cart/:id")
  remove(@Param("id") id: string) {
    return this.addCartService.remove(+id);
  }
}
