import { Wallets } from 'src/wallets/entities/wallet.entity';

export class CreateUserDto {
    username : string;
    email : string;
    password : string;
    walletaddress : Wallets;
}
