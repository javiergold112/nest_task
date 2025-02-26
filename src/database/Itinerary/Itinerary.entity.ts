import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Itinerary {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Id: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  //check
  @Column({ type: 'simple-array' })
  SortedTicket: string[];

  @Column({ type: 'simple-array' })
  Humanized: string[];
}
