import axios from 'axios';

export interface PriceDataPoint {
  month: string;
  price: number;
}

const monthMap: { [key: number]: string } = {
  0: 'Jan', 1: 'Fev', 2: 'Mar', 3: 'Abr', 4: 'Mai', 5: 'Jun',
  6: 'Jul', 7: 'Ago', 8: 'Set', 9: 'Out', 10: 'Nov', 11: 'Dez',
};

export const fetchCarbonPriceHistory = async (): Promise<PriceDataPoint[]> => {
  try {
    const tokenId = 'toucan-protocol-base-carbon-tonne';
    // --- INÍCIO DA MODIFICAÇÃO ---
    // Removemos o parâmetro '&interval=monthly' que estava causando o erro 400
    const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=365`;
    // --- FIM DA MODIFICAÇÃO ---

    const response = await axios.get(url);
    const dailyPrices = response.data.prices;

    if (!dailyPrices || dailyPrices.length === 0) {
      throw new Error('Nenhum dado de preço retornado pela API');
    }

    // --- INÍCIO DA MODIFICAÇÃO ---
    // Processa os dados diários para extrair um ponto por mês (o primeiro de cada mês)
    const monthlyData: { [key: string]: PriceDataPoint } = {};
    dailyPrices.forEach((pricePoint: [number, number]) => {
      const timestamp = pricePoint[0];
      const price = pricePoint[1];
      const date = new Date(timestamp);
      const month = date.getMonth();
      const monthName = monthMap[month];

      // Se ainda não tivermos um preço para este mês, adicionamos este
      if (!monthlyData[monthName]) {
        monthlyData[monthName] = {
          month: monthName,
          price: parseFloat(price.toFixed(2)),
        };
      }
    });

    // Garante que os meses estejam na ordem correta
    const sortedMonths = Object.values(monthMap);
    const formattedData = sortedMonths
      .map(monthName => monthlyData[monthName])
      .filter(Boolean); // Remove meses para os quais não temos dados

    return formattedData as PriceDataPoint[];
    // --- FIM DA MODIFICAÇÃO ---

  } catch (error) {
    console.error("Erro ao buscar dados do CoinGecko:", error);
    throw error;
  }
};