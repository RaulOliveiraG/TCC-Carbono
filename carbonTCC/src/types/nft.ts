// --- INÍCIO DO ARQUIVO: src/types/nft.ts ---

export interface NftAttribute {
  trait_type: 'Região' | 'Créditos (Ton CO2)' | 'Preço (MATIC)';
  value: string | number;
}

export interface NftMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: NftAttribute[]; 
}

export interface Nft {
  id: string;
  owner: string;
  metadata: NftMetadata;
}