import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiTags, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { Wallets } from './entities/wallet.entity';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiBody({
    description: 'Create a new wallet',
    schema: {
      example: {
        walletaddress: '0x1234567890abcdef1234567890abcdef1234567890'
      }
    }
  })
  @ApiCreatedResponse({
    description: 'The wallet creation is successfull.',
    type: Wallets, 
  })
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Find all wallets',
    type: [Wallets], 
  })
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Find a wallet by ID',
    type: Wallets,
  })
  @ApiNotFoundResponse({ description: 'Wallet not found.' })
  findOne(@Param('id') id: string) {
    return this.walletsService.findOne(+id);
  }

  @Get(':walletAddress')
  @ApiParam({
    name: 'walletAddress',
    description: 'Wallet address to find specific user',
    example: '0x1234567890abcdef1234567890abcdef1234567890',
    required: true,
  })
  @ApiOkResponse({
    description: 'User found by wallet address',
    type: Wallets, 
  })
  @ApiNotFoundResponse({ description: 'User not found by wallet address.' })
  async findUserByWalletAddress(@Param('walletAddress') walletAddress: string) {
    const user = await this.walletsService.findByWalletAddress(walletAddress);
    if (!user) {
        throw new NotFoundException('User not found');
    }
    return user;
  }

  @Patch(':id')
  @ApiBody({
    description: 'Update a wallet',
    schema: { 
      example: {
        walletaddress: '0x9876543210fedcba9876543210fedcba9876543210'
      }
    }
  })
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletsService.remove(+id);
  }
}