import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity({name : 'wallets'})
export class Wallets {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({unique : true})
    walletaddress : string;

    @OneToOne(() => User , (user) => user.walletAddress)
    @JoinColumn({name : 'user_id'})
    user : User;
}
