import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public path!: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  public updatedAt!: Date;
}
