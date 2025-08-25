import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native'; // Adicionado Pressable
import { useRouter } from 'expo-router';
import { useResponsive } from '@/hooks/useResponsive';
import { COLORS } from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '../common/Button';

interface HeaderProps {
  onHowItWorksPress?: () => void;
}

interface MenuItemsProps {
  onHowItWorksPress?: () => void;
  onItemPress?: () => void;
}

const MenuItems = ({ onHowItWorksPress, onItemPress }: MenuItemsProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleHowItWorksPress = () => {
    if (onHowItWorksPress) {
      onHowItWorksPress();
    } else {
      router.push('/home');
    }
    onItemPress?.();
  };

  const handleMarketplacePress = () => {
    router.push('/marketplace');
    onItemPress?.();
  };

    const handleSettingsPress = () => {
    router.push('/settings');
    onItemPress?.();
  };

  return (
    <>
      <TouchableOpacity style={styles.navItem} onPress={handleHowItWorksPress}>
        <Text style={styles.navText}>Como Funciona</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={handleMarketplacePress}>
        <Text style={styles.navText}>Marketplace</Text>
      </TouchableOpacity>
      {isAuthenticated && (
        <TouchableOpacity style={styles.navItem} onPress={handleSettingsPress}>
          <Text style={styles.navText}>Configurações</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export function Header({ onHowItWorksPress }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useResponsive();
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Image
          source={require('../../assets/images/logoText.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>

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
          {isAuthenticated ? (
            <Button title="Sair" onPress={handleLogout} variant="outline" />
          ) : (
            <Button title="Entrar" onPress={() => router.push('/login')} />
          )}
        </View>
      )}

      <Modal visible={isMenuOpen} transparent animationType="slide" onRequestClose={toggleMenu}>
        {/* --- INÍCIO DA MODIFICAÇÃO --- */}
        {/* O View do overlay foi trocado por um Pressable que fecha o menu ao ser tocado */}
        <Pressable style={styles.modalOverlay} onPress={toggleMenu}>
          {/* Adicionamos um Pressable em volta do conteúdo para impedir que o toque "vaze" para o overlay */}
          <Pressable style={styles.modalContent}>
            <MenuItems onHowItWorksPress={onHowItWorksPress} onItemPress={toggleMenu} />
            
            {isAuthenticated ? (
              // Quando logado, o botão "Sair" tem o estilo 'outline'
              <Button title="Sair" onPress={handleLogout} variant="outline" style={{ width: '100%' }} />
            ) : (
              // Quando deslogado, mostramos o botão "Entrar" e o "Fechar"
              <>
                <Button title="Entrar" onPress={() => { toggleMenu(); router.push('/login'); }} style={{ width: '100%' }} />
                <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
                  <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
        {/* --- FIM DA MODIFICAÇÃO --- */}
      </Modal>
    </View>
  );
}

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
    padding: 15,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: { color: COLORS.white, fontSize: 16, fontWeight: '500' },
});