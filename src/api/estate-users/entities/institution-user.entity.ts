import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from 'src/api/user/entities/user.entity';
  import { Institution } from 'src/api/estates/entities/estate.entity';
  
  @Entity({
    name: 'estate_users',
    // orderBy: {
    //   email: 'ASC',
    // },
  })
  @Unique(['id'])
  export class InstitutionUser {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { name: 'user_id', nullable: true, length: 200 })
    user_id?: string;

    @Column('varchar', { name: 'estate_id', nullable: true, length: 36 })
    estate_id?: string;

    @Column('varchar', { name: 'status', nullable: true, length: 50 })
    status?: number;

    @Column('varchar', { name: 'created_by', nullable: true, length: 100 })
    created_by?: string;

    @Column('varchar', { name: 'updated_by', nullable: true, length: 100 })
    updated_by?: string;

    @Column('date', { name: 'created_at', nullable: true })
    created_at?: Date | string;
  
    @Column('datetime', { name: 'updated_at', nullable: true })
    updated_at?: Date | string;

    @Column('varchar', { name: 'approved_by', nullable: true, length: 100 })
    approved_by?: string;

    @Column('date', { name: 'approved_at', nullable: true })
    approved_at?: Date | string;

    @CreateDateColumn({ name: 'timestamp' })
    timestamp?: Date;

    @ManyToOne(() => User, (user) => user.institutionUser, { eager: true })
    @JoinColumn({name: "user_id"})
    user?: User;

    @ManyToOne(() => Institution, (institution) => institution.institutionUser, { eager: true })
    @JoinColumn({name: "estate_id"})
    institution?: Institution;
  }