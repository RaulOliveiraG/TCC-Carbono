import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router'; // Importar o useRouter
import { useResponsive } from '@/hooks/useResponsive';
import { COLORS } from '@/constants/colors';
// --- INÍCIO DA MODIFICAÇÃO ---
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../common/Button'; // Usaremos nosso botão padrão
// --- FIM DA MODIFICAÇÃO ---

interface HeaderProps {
  onHowItWorksPress?: () => void;
}

interface MenuItemsProps {
  onHowItWorksPress?: () => void;
  onItemPress?: () => void;
}

const MenuItems = ({ onHowItWorksPress, onItemPress }: MenuItemsProps) => {
  const handleHowItWorksPress = () => {
    onHowItWorksPress?.();
    onItemPress?.();
  };

  return (
    <>
      <TouchableOpacity style={styles.navItem} onPress={handleHowItWorksPress}>
        <Text style={styles.navText}>Como Funciona</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Marketplace</Text>
      </TouchableOpacity>
    </>
  );
};

export function Header({ onHowItWorksPress }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useResponsive();
  const router = useRouter();

  // --- INÍCIO DA MODIFICAÇÃO ---
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Após o logout, redireciona para a tela de login
    router.replace('/login');
  };
  // --- FIM DA MODIFICAÇÃO ---

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/images/logoText.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {isMobile ? (
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.desktopNav}>
          <MenuItems onHowItWorksPress={onHowItWorksPress} />
          {/* --- INÍCIO DA MODIFICAÇÃO --- */}
          {isAuthenticated ? (
            <Button title="Sair" onPress={handleLogout} variant="outline" />
          ) : (
            <Button title="Entrar" onPress={() => router.push('/login')} />
          )}
          {/* --- FIM DA MODIFICAÇÃO --- */}
        </View>
      )}

      <Modal visible={isMenuOpen} transparent animationType="slide" onRequestClose={toggleMenu}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MenuItems onHowItWorksPress={onHowItWorksPress} onItemPress={toggleMenu} />
            {/* --- INÍCIO DA MODIFICAÇÃO --- */}
            {isAuthenticated ? (
              <Button title="Sair" onPress={handleLogout} style={{ width: '100%' }} />
            ) : (
              <Button title="Entrar" onPress={() => router.push('/login')} style={{ width: '100%' }} />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
            {/* --- FIM DA MODIFICAÇÃO --- */}
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ... (estilos)
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: { width: 120, height: 40 },
  desktopNav: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  navItem: { paddingHorizontal: 10, paddingVertical: 8 },
  navText: { fontSize: 14, color: COLORS.textPrimary },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
  },
  loginText: { color: COLORS.white, fontSize: 14, fontWeight: '500' },
  menuButton: { padding: 10 },
  menuIcon: { width: 24, height: 18, justifyContent: 'space-between' },
  menuLine: { height: 2, width: '100%', backgroundColor: COLORS.textPrimary, borderRadius: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    gap: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '500' },
});