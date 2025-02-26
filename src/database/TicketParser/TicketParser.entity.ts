import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TicketParser {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  Id: number;

  @Column({ type: 'varchar', length: 20 })
  Type: string;

  @Column({ type: 'varchar', length: 100 })
  OriginKey: string;

  @Column({ type: 'varchar', length: 100 })
  DestinationKey: string;

  @Column({ type: 'varchar' })
  Helper: string;
}
