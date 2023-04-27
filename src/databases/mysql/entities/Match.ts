import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsEnum, IsInt, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Exclude, Type } from 'class-transformer';

import { MatchStatus } from '@Enums/MatchStatus';

import { Club } from '@Entities/Club';
import { League } from '@Entities/League';

@Entity()
// @Index(['league.id', 'matchDay', 'homeClub.id', 'awayClub.id'])
export class Match {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Exclude({ toClassOnly: true })
  id: number;

  @ManyToOne(() => League, (league) => league.id)
  @JoinColumn()
  @ValidateNested()
  @Type(() => League)
  league: League;

  @Column({ type: 'enum', enum: MatchStatus, default: MatchStatus.INCOMING })
  @IsEnum(MatchStatus)
  status: MatchStatus;

  @Column()
  @IsInt()
  matchDay: number;

  @Column()
  @IsString()
  matchCode: string;

  @Column({ nullable: true, default: 0 })
  @IsInt()
  homeScore: number;

  @Column({ nullable: true, default: 0 })
  @IsInt()
  awayScore: number;

  @ManyToOne(() => Club, (club) => club.id)
  @JoinColumn()
  @ValidateNested()
  @Type(() => Club)
  homeClub: Club;

  @ManyToOne(() => Club, (club) => club.id)
  @JoinColumn()
  @ValidateNested()
  @Type(() => Club)
  awayClub: Club;

  @Column({ type: 'timestamp' })
  @IsDate()
  matchTime: Date;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  @Exclude()
  updatedAt: Date;
}
