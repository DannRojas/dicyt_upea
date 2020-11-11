import { InvestigatorInterface } from "./investigator";
import { AuxiliarInterface } from "./auxiliar";
import { ResponsableInterface } from "./responsable";

export interface UserInterface {
  id_user?: number;
  type?: string;
  ci?: string;
  names?: string;
  last_name?: string;
  phone?: string;
  username?: string;
  email?: string;
  password?: string;
}

export interface RegisterInterface {
  user: UserInterface;
  investigator: InvestigatorInterface;
  auxiliar: AuxiliarInterface;
  responsable: ResponsableInterface;
}

export interface CompInvestigatorInterface {
  investigatorCode?: number;
  id_user?: number;
  type?: string;
  turn?: string;
  year?: number;
  institute_code?: number;
  user: UserInterface;
}
