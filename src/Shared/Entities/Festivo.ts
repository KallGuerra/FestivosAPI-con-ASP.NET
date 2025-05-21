import { Tipo } from './Tipo';

export interface Festivo{
  id: number;
  dia: number;
  mes: number;
  nombre: string;
  idTipo: number;
  diasPascua: number;
  tipo: Tipo;
}
