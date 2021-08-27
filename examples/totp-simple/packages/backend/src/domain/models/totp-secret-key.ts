import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { User } from "./user"

type PlainTotpSecretKey = {
  id?: string
  key: string
  isRegistered: boolean
  user: User
}

@Entity({ name: "totp_secret_key" })
export class TotpSecretKey {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Column({ name: "key" })
  key!: string

  @Column({ name: "is_registered" })
  isRegistered!: boolean

  @Column({ name: "user_id" })
  userId!: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User

  @CreateDateColumn({ name: "createdAt" })
  readonly createdAt!: Date

  constructor(attrs?: PlainTotpSecretKey) {
    if (!attrs) {
      return this
    }
    if (attrs.id) this.id = attrs.id
    this.key = attrs.key
    this.isRegistered = attrs.isRegistered
    this.user = attrs.user
  }
}
