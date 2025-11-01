import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useThemeColors } from '@/styles/theme';
import { fetchCarbonPriceHistory, PriceDataPoint } from '@/services/marketDataService';

const screenWidth = Dimensions.get('window').width;

export function PriceChart() {
  const colors = useThemeColors();
  const [data, setData] = useState<PriceDataPoint[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const priceHistory = await fetchCarbonPriceHistory();
        setData(priceHistory);
      } catch (err) {
        console.error("Failed to fetch price history:", err);
        setError("Não foi possível carregar os dados do gráfico.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: colors.textSecondary }}>{error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={{ color: colors.textSecondary }}>Nenhum dado disponível.</Text>
      </View>
    );
  }

  const chartData = {
    labels: data.map(p => p.month),
    datasets: [
      {
        data: data.map(p => p.price),
        color: (opacity = 1) => colors.primary,
        strokeWidth: 2,
      },
    ],
    legend: ['Preço (USD/ton CO₂)'],
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.white }]}>Preços dos Créditos de Carbono</Text>
      <LineChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: colors.primaryDark,
          backgroundGradientFrom: colors.primaryDark,
          backgroundGradientTo: colors.primaryDark,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: colors.primaryLight,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  loaderContainer: {
    height: 258, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});