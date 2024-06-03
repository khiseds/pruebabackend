import { EntityRepository, Repository } from "typeorm";
import { PasswordResetsEntity } from "./passwordResets.entity";

@EntityRepository(PasswordResetsEntity)
export class passwordResetsRepository extends Repository<PasswordResetsEntity>{}