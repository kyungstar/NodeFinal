
import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class ConfigMaster {
    @PrimaryColumn({ type: "int", generated: "increment" })  // Use "increment" instead of "auto"
    config_id: number;

    @Column()
    config_key: string;

    @Column()
    config_value: string;
}