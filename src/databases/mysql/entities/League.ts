import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class League {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsOptional()
  @Exclude({ toClassOnly: true })
  @Expose({ toPlainOnly: true })
  id: number;

  @Column()
  @IsString()
  name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  @Exclude()
  updatedAt: Date;
}
