import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
  } from 'typeorm';
  import { Permission } from './../../permissions/entities/permission.entity';
  import { User } from 'src/api/user/entities/user.entity';
  
  @Entity({
    name: 'roles',
    // orderBy: {
    //   email: 'ASC',
    // },
  })
  @Unique(['id'])
  export class Role {
    @Column("char", { primary: true, name: "id", length: 36 })
    id: string;

    @Column('varchar', { name: 'user_type', nullable: true, length: 50 })
    user_type?: string;

    @Column('varchar', { name: 'role_name', nullable: true, length: 100 })
    role_name?: string;

    @Column('varchar', { name: 'description', nullable: true, length: 200 })
    description?: string;

    @Column('varchar', { name: 'slug', nullable: true, length: 50 })
    slug?: string;

    @Column('varchar', { name: 'status', nullable: true, length: 50 })
    status?: number;

    @OneToMany((type) => Permission, (permission) => permission.role)
    permission?: Permission;

    @Column('varchar', { name: 'created_by', nullable: true, length: 100 })
    created_by?: string;

    @Column('varchar', { name: 'updated_by', nullable: true, length: 100 })
    updated_by?: string;

    @Column('date', { name: 'created_at', nullable: true })
    created_at?: Date | string;
  
    @Column('datetime', { name: 'updated_at', nullable: true })
    updated_at?: Date | string;

    @CreateDateColumn({ name: 'timestamp' })
    timestamp?: Date;

  }