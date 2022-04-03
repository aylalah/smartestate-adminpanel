import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/api/role/entities/role.entity';
import { Permission } from 'src/api/permissions/entities/permission.entity';
import { InstitutionUser } from 'src/api/estate-users/entities/institution-user.entity';

@Entity({
  name: 'users',
  // orderBy: {
  //   email: 'ASC',
  // },
})

@Unique(['id'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { name: 'role_id', nullable: true, length: 36 })
  role_id?: string;

  @Column('varchar', { name: 'permission_id', nullable: true, length: 36 })
  permission_id?: string;

  @Column('varchar', { name: 'user_code', nullable: true, length: 26 })
  user_code?: string;

  @Column('varchar', { name: 'first_name', nullable: true, length: 52 })
  first_name?: string;

  @Column('varchar', { name: 'last_name', nullable: true, length: 52 })
  last_name?: string;

  @Column('varchar', { name: 'username', nullable: true, length: 52 })
  username?: string;

  @Column('varchar', { name: 'email', nullable: true, length: 52 })
  email?: string;

  @Column('tinyint', { name: 'email_valid', nullable: true, width: 1 })
  email_valid?: boolean;

  @Column('varchar', { name: 'password', length: 255 })
  password?: string;

  @Column('varchar', { name: 'phone_number', nullable: true, length: 26 })
  phone_number?: string;

  @Column('varchar', { name: 'bvn', nullable: true, length: 11 })
  bvn?: string;

  @Column('tinyint', { name: 'bvn_valid', nullable: true, width: 1 })
  bvn_valid?: boolean;

  @Column('varchar', { name: 'gender', nullable: true, length: 26 })
  gender?: string;

  @Column('varchar', { name: 'home_address', nullable: true, length: 255 })
  home_address?: string;

  @Column('varchar', {
    name: 'state_of_residence',
    nullable: true,
    length: 100,
  })
  state_of_residence?: string;

  @Column('varchar', { name: 'lga', nullable: true, length: 200 })
  lga?: string;

  @Column('varchar', { name: 'geo_political_zone', nullable: true, length: 200 })
  geo_political_zone?: string;

  @Column('varchar', { name: 'image', nullable: true, length: 255, transformer: {
    to: (value: string) => value,
    from: (value: string) => value ? `${process.env.PROFILE_BASE_URL}/${value}` : value,
  } })
  image?: string;

  @Column('varchar', { name: 'document', nullable: true, length: 255, transformer: {
    to: (value: string) => value,
    from: (value: string) => value ? `${process.env.DOCUMENT_BASE_URL}/${value}` : value,
  } })
  document?: string;

  @Column('tinyint', { name: 'document_state', nullable: true, width: 1 })
  document_state?: boolean;


  @Column('varchar', { name: 'pin', nullable: true, length: 60 })
  pin?: string;

  @Column('varchar', { name: 'phone_otp', nullable: true, length: 20 })
  phone_otp?: string;

  @Column('tinyint', { name: 'phone_otp_verified', nullable: true, width: 1 })
  phone_otp_verified?: boolean;

  @Column('varchar', { name: 'email_otp', nullable: true, length: 20 })
  email_otp?: string;

  @Column('tinyint', { name: 'email_otp_verified', nullable: true, width: 1 })
  email_otp_verified?: boolean;

  @Column('varchar', { name: 'email_token', nullable: true, length: 255 })
  email_token?: string;

  @Column('tinyint', { name: 'bvn_otp_verified', nullable: true, width: 1 })
  bvn_otp_verified?: boolean;

  @Column('varchar', { name: 'bvn_phone_number', nullable: true, length: 26 })
  bvn_phone_number?: string;

  @Column('tinyint', { name: 'status', nullable: true, width: 1 })
  status?: boolean;

  @Column('varchar', { name: 'post_status', length: 26 })
  post_status?: string;

  @Column('varchar', { name: 'device_type', nullable: true, length: 26 })
  device_type?: string;

  @Column('varchar', { name: 'device_id', nullable: true, length: 255 })
  device_id?: string;

  @ManyToOne(() => Permission, (permission) => permission.user, { eager: true })
  permission?: Permission;

  @Column('date',{ name: 'ondording_date'})
  ondording_date?: string;

  @Column('datetime', { name: 'suspended_at', nullable: true })
  suspended_at?: string;

  @Column('datetime', { name: 'closed_at', nullable: true })
  closed_at?: string;

  @Column('varchar', { name: 'created_by', nullable: true, length: 50 })
  created_by?: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at?: string;

  @Column('varchar', { name: 'updated_by', nullable: true, length: 50 })
  updated_by?: string;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updated_at?: string;

  @DeleteDateColumn({ name: 'deleted_at', select: false })
  deleted_at?: string;

  @Column('varchar', { name: 'approved_by', nullable: true, length: 50 })
  approved_by?: string;

  @UpdateDateColumn({ name: 'approved_at', select: false })
  approved_at?: string;

  @Column('timestamp', { name: 'last_activity', nullable: true })
  last_activity?: string;

  @OneToMany((type) => InstitutionUser, (institutionUser) => institutionUser.institution)
  institutionUser?: InstitutionUser;
}
