import { Tipo } from './Tipo';

export interface Festivo{
  Id: number;
  dia: number;
  mes: number;
  nombre: string;
  idTipo: number;
  diasPascua: number;
  tipo: Tipo;
}
