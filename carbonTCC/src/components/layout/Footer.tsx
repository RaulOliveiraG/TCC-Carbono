import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/colors';

export function Footer() {
  return (
    <View style={styles.footer}>
      <View>
        <Image
          source={require('../../assets/images/logoText.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.copyright, { marginTop: 5 }]}>© 2023 Carbono NFT.</Text>
        <Text style={styles.copyright}>Todos os direitos reservados.</Text>
      </View>

      <View style={styles.footerColumn}>
        <Text style={styles.footerLink}>Termos de uso</Text>
        <Text style={styles.footerLink}>Contato</Text>
        <Text style={styles.footerLink}>Política de Privacidade</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 40,
    backgroundColor: COLORS.background,
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
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  copyright: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});