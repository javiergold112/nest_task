import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transportation {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Id: number;

  @Column({ type: 'varchar', length: 100 })
  OriginKey: string;

  @Column({ type: 'varchar', length: 100 })
  DestinationKey: string;

  @Column({ type: 'string' })
  TicketParser: string;
}
