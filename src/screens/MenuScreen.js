import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SectionList, TouchableOpacity } from 'react-native';
import LittleLemonFooter from '../components/LittleLemonFooter';
import authService from '../services/authService';
import { useTheme } from '../context/ThemeContext';

const menuItemsToDisplay = [
  {
    title: 'Appetizers',
    data: [{
      name: 'Hummus',
      price: '$5.99',
    },
    {
      name: 'Moutabal',
      price: '$5.99',
    },
    {
      name: 'Falafel',
      price: '$5.99',
    },
    {
      name: 'Marinated Olives',
      price: '$5.99',
    },
    {
      name: 'Kofta',
      price: '$5.99',
    },
    {
      name: 'Eggplant Salad',
      price: '$5.99',
    },
  ]},
  {
    title: 'Main Dishes',
    data: [{
      name: 'Lentil Burger',
      price: '$5.99',
    },
    {
      name: 'Smoked Salmon',
      price: '$5.99',
    },
    {
      name: 'Kofta Burger',
      price: '$5.99',
    },
    {
      name: 'Turkish Kebab',
      price: '$5.99',
    },
  ]},
  {
    title: 'Sides',
    data: [{
      name: 'Fries',
      price: '$5.99',
    },
    {
      name: 'Buttered Rice',
      price: '$5.99',
    },
    {
      name: 'Lentil Soup',
      price: '$5.99',
    },
    {
      name: 'Greek Salad',
      price: '$5.99',
    },
    {
      name: 'Rice Pilaf',
      price: '$5.99',
    },
  ]},
  {
    title: 'Desserts',
    data: [{
      name: 'Baklava',
      price: '$5.99',
    },
    {
      name: 'Tartufo',
      price: '$5.99',
    },
    {
      name: 'Tiramisu',
      price: '$5.99',
    },
    {
      name: 'Panna Cotta',
      price: '$5.99',
    },
  ]},
];

const Item = ({ name, price }) => {
  const { theme } = useTheme();
  return (
    <View style={[menuStyles.innerContainer, { backgroundColor: theme.colors.surface }]}>
      <Text style={[menuStyles.itemText, { color: theme.colors.primary }]}>{name}</Text>
      <Text style={[menuStyles.itemText, { color: theme.colors.primary }]}>{price}</Text>
    </View>
  );
};

const Separator = () => {
  const { theme } = useTheme();
  return <View style={[menuStyles.separator, { backgroundColor: theme.colors.border }]} />;
};

const Header = () => {
  const { theme } = useTheme();
  return <Text style={[menuStyles.headerText, { color: theme.colors.text, backgroundColor: theme.colors.background }]}>Menu</Text>;
};

const Footer = () => <LittleLemonFooter />;

const UserInfoHeader = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await authService.getUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    };

    loadUser();
  }, []);

  return (
    <View style={[menuStyles.userInfoContainer, { backgroundColor: theme.colors.secondary }]}>
      <Text style={[menuStyles.userInfoText, { color: theme.colors.primary }]}>
        Welcome, {user?.name || 'Guest'}! 🍋
      </Text>
      <Text style={[menuStyles.userInfoSubtext, { color: theme.colors.text }]}>
        Explore our delicious menu
      </Text>
    </View>
  );
};

const MenuScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const renderItem = ({ item }) => <Item name={item?.name} price={item?.price} />;
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={[menuStyles.itemHeader, { color: theme.colors.text, backgroundColor: theme.colors.secondary }]}>
      {title}
    </Text>
  );

  return (
    <View style={[menuStyles.container, { backgroundColor: theme.colors.background }]}>
      <SectionList
        sections={menuItemsToDisplay}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={
          <View>
            <UserInfoHeader />
            <Header />
          </View>
        }
        ListFooterComponent={Footer}
        ItemSeparatorComponent={Separator}
      />
      

    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    padding: 20,
    alignItems: 'center',
  },
  userInfoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfoSubtext: {
    fontSize: 14,
    opacity: 0.8,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  headerText: {
    fontSize: 40,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
  itemHeader: {
    fontSize: 24,
    padding: 10,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
  },
  nextButton: {
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen; 