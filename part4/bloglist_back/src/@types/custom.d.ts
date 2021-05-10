declare namespace Express {
  export interface Request {
    token?: string;
    user?: import('../utils/types').UserDocument;
  }
}
