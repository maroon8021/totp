import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm"

type PlainUser = {
  id?: string
  name: string
}

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  readonly id!: string

  @Column({ name: "name" })
  name!: string

  @CreateDateColumn({ name: "created_at" })
  readonly createdAt!: Date

  @UpdateDateColumn({ name: "updated_at" })
  readonly updatedAt!: Date

  constructor(attrs?: PlainUser) {
    if (!attrs) {
      return this
    }
    if (attrs.id) this.id = attrs.id
    this.name = attrs.name
  }
}
