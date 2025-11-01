import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useResponsive } from '@/hooks/useResponsive';
import { useThemeColors } from '@/styles/theme';
import { useAuth } from '@/contexts/AuthProvider';
import { Button } from '../common/Button';

interface HeaderProps {
  onHowItWorksPress?: () => void;
}

interface MenuItemsProps {
  onHowItWorksPress?: () => void;
  onItemPress?: () => void;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoImage: {
    width: 30,
    height: 30,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desktopNav: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  navItem: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  navText: { fontSize: 18 },
  menuButton: { padding: 10 },
  menuIcon: { width: 24, height: 18, justifyContent: 'space-between' },
  menuLine: { height: 2, width: '100%', borderRadius: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: 10,
  },
  closeButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: { fontSize: 16, fontWeight: '500' },
});

const MenuItems = ({ onHowItWorksPress, onItemPress }: MenuItemsProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const colors = useThemeColors();

  const handleHowItWorksPress = () => {
    if (onHowItWorksPress) {
      onHowItWorksPress();
    } else {
      router.push({ pathname: '/home' });
    }
    onItemPress?.();
  };

  return (
    <>
      <TouchableOpacity style={styles.navItem} onPress={handleHowItWorksPress}>
        <Text style={[styles.navText, { color: colors.textPrimary }]}>Como Funciona</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => { router.push({ pathname: '/marketplace' }); onItemPress?.(); }}>
        <Text style={[styles.navText, { color: colors.textPrimary }]}>Marketplace</Text>
      </TouchableOpacity>
      {isAuthenticated && (
        <TouchableOpacity style={styles.navItem} onPress={() => { router.push({ pathname: '/settings' }); onItemPress?.(); }}>
          <Text style={[styles.navText, { color: colors.textPrimary }]}>Configurações</Text>
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
  const colors = useThemeColors();

  const handleLogout = async () => {
    await logout();
    router.replace({ pathname: '/login' });
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      <TouchableOpacity onPress={() => router.push({ pathname: '/home' })}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Text style={[styles.logoText, { color: colors.textPrimary }]}>CarbonNFT</Text>
        </View>
      </TouchableOpacity>

      {isMobile ? (
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={[styles.menuLine, { backgroundColor: colors.textPrimary }]} />
            <View style={[styles.menuLine, { backgroundColor: colors.textPrimary }]} />
            <View style={[styles.menuLine, { backgroundColor: colors.textPrimary }]} />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.desktopNav}>
          <MenuItems onHowItWorksPress={onHowItWorksPress} />
          {isAuthenticated ? (
            <Button title="Sair" onPress={handleLogout} variant="outline" />
          ) : (
            <Button title="Entrar" onPress={() => router.push({ pathname: '/login' })} />
          )}
        </View>
      )}

      <Modal visible={isMenuOpen} transparent animationType="slide" onRequestClose={toggleMenu}>
        <Pressable style={styles.modalOverlay} onPress={toggleMenu}>
          <Pressable style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <MenuItems onHowItWorksPress={onHowItWorksPress} onItemPress={toggleMenu} />
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            {isAuthenticated ? (
              <Button title="Sair" onPress={handleLogout} variant="outline" style={{ width: '100%' }} />
            ) : (
              <>
                <Button title="Entrar" onPress={() => { toggleMenu(); router.push({ pathname: '/login' }); }} style={{ width: '100%' }} />
                <TouchableOpacity style={[styles.closeButton, { backgroundColor: colors.primary }]} onPress={toggleMenu}>
                  <Text style={[styles.closeButtonText, { color: colors.white }]}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}