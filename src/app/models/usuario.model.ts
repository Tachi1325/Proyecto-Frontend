export class Usuario{
  constructor(
    public email: string,
    public password: string,
    public nombre?: string,
    public idUsuario?: number,
    public imegen?: string,
    public google?: boolean,
    public activo?: boolean,
    public nativo?: boolean,
  ){}
}
