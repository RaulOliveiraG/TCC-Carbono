import { Nft } from "@/types/nft";

export const mockNfts: Nft[] = [
  {
    id: '1',
    owner: '0x1234...5678',
    metadata: {
      name: 'Crédito de Carbono - Amazônia #001',
      description: '10 toneladas de CO2 compensadas por reflorestamento na Amazônia.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
      attributes: [
        { trait_type: 'Região', value: 'Amazônia' },
        { trait_type: 'Créditos (Ton CO2)', value: 10 },
        { trait_type: 'Preço (MATIC)', value: 1.5 },
      ],
    },
  },
  {
    id: '2',
    owner: '0xABCD...EFGH',
    metadata: {
      name: 'Crédito de Carbono - Cerrado #002',
      description: '5 toneladas de CO2 compensadas pela preservação do Cerrado.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
      attributes: [
        { trait_type: 'Região', value: 'Cerrado' },
        { trait_type: 'Créditos (Ton CO2)', value: 5 },
        { trait_type: 'Preço (MATIC)', value: 0.8 },
      ],
    },
  },
  {
    id: '3',
    owner: '0x5555...9999',
    metadata: {
      name: 'Crédito de Carbono - Mata Atlântica #003',
      description: '20 toneladas de CO2 compensadas por projeto de recuperação.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
      attributes: [
        { trait_type: 'Região', value: 'Mata Atlântica' },
        { trait_type: 'Créditos (Ton CO2)', value: 20 },
        { trait_type: 'Preço (MATIC)', value: 2.2 },
      ],
    },
  },
    {
    id: '4',
    owner: '0xABCD...EFGH',
    metadata: {
      name: 'Crédito de Carbono - Cerrado #004',
      description: '12 toneladas de CO2 compensadas pela preservação do Cerrado.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop',
      attributes: [
        { trait_type: 'Região', value: 'Cerrado' },
        { trait_type: 'Créditos (Ton CO2)', value: 12 },
        { trait_type: 'Preço (MATIC)', value: 1.1 },
      ],
    },
  },
];