import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Wallets } from 'src/wallets/entities/wallet.entity';

//naming the table as users for reference.
@Entity({name : 'Users'})
export class User {
    @PrimaryGeneratedColumn()
    id : number;  //its autoincremented.

    @Column({ unique : true})
    username : string;

    @Column()
    email : string;

    @Column()
    password : string;

    @OneToOne(() => Wallets, (walletAddress) => walletAddress.user)
    @JoinColumn() // Join the tables using the 'user_id' column
    walletAddress: Wallets;
}
