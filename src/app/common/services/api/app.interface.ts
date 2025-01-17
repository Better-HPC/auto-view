export interface AppMeta {
  name: string;
  version: string;
}

export interface SchemaColumn {
  type: string;
  nullable: boolean;
  default: string;
  primary_key: boolean;
}

export interface SchemaTable {
  columns: { [key: string]: SchemaColumn };
}

export interface Schema {
  [key: string]: SchemaTable;
}
