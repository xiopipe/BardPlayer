import { ORM } from '../indexed';

export interface ISongs {
  _id: string;
  title: string;
  content: string;
  file?: File | Blob;
  img?: File | Blob;
  order?: number;
  loop?: boolean;
}

export default class Songs {
  public baseDB = ORM.db();
  public data = ORM.db().songs;

  public _id?: string;
  public title?: string;
  public content?: string;
  public file?: File | Blob;
  public img?: File | Blob;
  public order?: number;
  public loop?: boolean;
}
