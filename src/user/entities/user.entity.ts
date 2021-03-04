import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';


@Entity()
export class User { 
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column({select: false})
  password: string;
  
  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLocaleLowerCase();
  }

}