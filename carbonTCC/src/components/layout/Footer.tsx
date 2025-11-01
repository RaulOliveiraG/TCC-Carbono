import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
import { useThemeColors } from '@/styles/theme';

export function Footer() {
  const colors = useThemeColors();

  const handleContactPress = async () => {
    const email = 'rauloliveiragarcia08@gmail.com';
    const url = `mailto:${email}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Não foi possível abrir', 'Nenhum aplicativo de e-mail encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar abrir o aplicativo de e-mail.');
    }
  };

  return (
    <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
      <View>
        <Image
          source={require('../../assets/images/logoText.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.copyright, { color: colors.textSecondary, marginTop: 5 }]}>© 2025 Carbon NFT.</Text>
        <Text style={[styles.copyright, { color: colors.textSecondary }]}>Todos os direitos reservados.</Text>
      </View>

      <View style={styles.footerColumn}>
        <TouchableOpacity>
          <Text style={[styles.footerLink, { color: colors.textSecondary }]}>Termos de uso</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleContactPress}>
          <Text style={[styles.footerLink, { color: colors.textSecondary }]}>Contato</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.footerLink, { color: colors.textSecondary }]}>Política de Privacidade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
  },
  logo: {
    width: 120,
    height: 40,
  },
  footerColumn: {
    flex: 1,
    marginRight: 20,
    marginTop: 8,
  },
  footerLink: {
    fontSize: 12,
    marginBottom: 12,
  },
  copyright: {
    fontSize: 12,
  },
});