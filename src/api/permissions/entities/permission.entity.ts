import { stringifiedJson } from 'aws-sdk/clients/customerprofiles';
import { ArrayValueList } from 'aws-sdk/clients/rdsdataservice';
import { Role } from 'src/api/role/entities/role.entity';
import { User } from 'src/api/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity({
    name: 'permissions',
    // orderBy: {
    //   email: 'ASC',
    // },
  })
  @Unique(['id'])
  export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { name: 'role_id', nullable: true, length: 100 })
    role_id?: string;

    @Column('varchar', { name: 'permission_name', nullable: true, length: 100 })
    permission_name?: string;

    @Column('varchar', { name: 'description', nullable: true, length: 200 })
    description?: string;

    @Column('varchar', { name: 'slug', nullable: true, length: 50 })
    slug?: string;

    @Column( { type: "json", name: 'module_access', nullable: true})
    module_access?: any;

    @Column('varchar', { name: 'status', nullable: true, length: 50 })
    status?: number;

    @OneToMany((type) => User, (user) => user.permission)
    user?: User;

    @Column('varchar', { name: 'created_by', nullable: true, length: 100 })
    created_by?: string;

    @Column('varchar', { name: 'updated_by', nullable: true, length: 100 })
    updated_by?: string;

    @Column('varchar', { name: 'approved_by', nullable: true, length: 100 })
    approved_by?: string;

    @Column('date', { name: 'created_at', nullable: true })
    created_at?: Date | string;
  
    @Column('datetime', { name: 'updated_at', nullable: true })
    updated_at?: Date | string;

    @Column('datetime', { name: 'approved_at', nullable: true })
    approved_at?: Date | string;

    @CreateDateColumn({ name: 'timestamp' })
    timestamp?: Date;

    @ManyToOne((type) => Role, (role) => role.permission, {eager: true})
    role?: Role;
  }