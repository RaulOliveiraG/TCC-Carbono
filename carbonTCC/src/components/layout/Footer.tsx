import React from 'react';
// --- INÍCIO DA MODIFICAÇÃO ---
import { Image, StyleSheet, Text, View, TouchableOpacity, Linking, Alert } from 'react-native';
// --- FIM DA MODIFICAÇÃO ---
import { COLORS } from '@/constants/colors';

export function Footer() {
  // --- INÍCIO DA MODIFICAÇÃO ---
  const handleContactPress = async () => {
    const email = 'rauloliveiragarcia08@gmail.com';
    const url = `mailto:${email}`;

    try {
      // Verifica se o dispositivo pode abrir o link 'mailto:'
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Se não houver um app de e-mail, informa o usuário.
        Alert.alert(
          'Não foi possível abrir',
          'Nenhum aplicativo de e-mail encontrado para completar esta ação.'
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao tentar abrir o aplicativo de e-mail.');
    }
  };
  // --- FIM DA MODIFICAÇÃO ---

  return (
    <View style={styles.footer}>
      <View>
        <Image
          source={require('../../assets/images/logoText.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.copyright, { marginTop: 5 }]}>© 2025 Carbon NFT.</Text>
        <Text style={styles.copyright}>Todos os direitos reservados.</Text>
      </View>

      <View style={styles.footerColumn}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Termos de uso</Text>
        </TouchableOpacity>
        {/* --- INÍCIO DA MODIFICAÇÃO --- */}
        <TouchableOpacity onPress={handleContactPress}>
          <Text style={styles.footerLink}>Contato</Text>
        </TouchableOpacity>
        {/* --- FIM DA MODIFICAÇÃO --- */}
        <TouchableOpacity>
          <Text style={styles.footerLink}>Política de Privacidade</Text>
        </TouchableOpacity>
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