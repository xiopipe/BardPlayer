import Dexie, { Table } from 'dexie';
import { ISongs } from 'src/stores/indexed/songs';

export class ORM extends Dexie {
  public songs!: Table<ISongs>;
  static instance: ORM;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      songs: '++_id, order, title, content, img, file',
    });
  }
  static db(): ORM {
    if (!ORM.instance) {
      ORM.instance = new ORM();
    }
    return ORM.instance;
  }
}
