export interface VaultEntry {
  id: string;
  label: string;
  username: string;
  password: string;
  createdAt: number;
}

export interface GeneratorOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}
