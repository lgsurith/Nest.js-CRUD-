import { User } from 'src/users/entities/user.entity';

export class CreateWalletDto {
    "walletaddress" : string;
    "user" : User;
}
