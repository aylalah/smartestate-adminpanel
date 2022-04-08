import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  import { InstitutionUser } from 'src/api/estate-users/entities/institution-user.entity';
  
  @Entity({
    name: 'estates',
    // orderBy: {
    //   email: 'ASC',
    // },
  })
  @Unique(['id'])
  export class Institution {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { name: 'estate_name', nullable: true, length: 100 })
    estate_name?: string;

    @Column('varchar', { name: 'estate_code', nullable: true, length: 50 })
    estate_code?: string;

    @Column('varchar', { name: 'estate_slug', nullable: true, length: 100 })
    estate_slug?: string;

    @Column('varchar', { name: 'contact_person', nullable: true, length: 15 })
    contact_person?: string;

    @Column('varchar', { name: 'phone_number', nullable: true, length: 15 })
    phone_number?: string;

    @Column('varchar', { name: 'email', nullable: true, length: 52 })
    email?: string;
  
    @Column('tinyint', { name: 'email_valid', nullable: true, width: 1 })
    email_valid?: boolean;

    @Column('varchar', { name: 'base_url', nullable: true, length: 100 })
    base_url?: string;

    @Column('varchar', { name: 'api_url', nullable: true, length: 100 })
    api_url?: string;

    @Column('varchar', { name: 'web_url', nullable: true, length: 100 })
    web_url?: string;

    @Column('varchar', { name: 'db_name', nullable: true, length: 100 })
    db_name?: string;

    @Column('varchar', { name: 'plan', nullable: true, length: 30 })
    plan?: string;

    @Column('varchar', { name: 'address', nullable: true, length: 200 })
    address?: string;

    @Column('varchar', { name: 'state', nullable: true, length: 100 })
    state?: string;

    @Column('varchar', { name: 'lga', nullable: true, length: 100 })
    lga?: string;

    @Column('varchar', { name: 'api_token', nullable: true, length: 100 })
    api_token?: string;

    @Column('varchar', { name: 'logo', nullable: true, length: 255})
    logo?: string;

    @Column('varchar', { name: 'bank', nullable: true, length: 100 })
    bank?: string;

    @Column('varchar', { name: 'account_number', nullable: true, length: 100 })
    account_number?: string;

    @Column('varchar', { name: 'account_name', nullable: true, length: 100 })
    account_name?: string;

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

    @OneToMany((type) => InstitutionUser, (institutionUser) => institutionUser.institution)
    institutionUser?: InstitutionUser;
  }