import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SectionList, TouchableOpacity } from 'react-native';
import LittleLemonFooter from '../components/LittleLemonFooter';
import authService from '../services/authService';

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

const Item = ({ name, price }) => (
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.itemText}>{name}</Text>
    <Text style={menuStyles.itemText}>{price}</Text>
  </View>
);

const Separator = () => <View style={menuStyles.separator} />;
const Header = () => <Text style={menuStyles.headerText}>Menu</Text>;
const Footer = () => <LittleLemonFooter />;

const UserInfoHeader = () => {
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
    <View style={menuStyles.userInfoContainer}>
      <Text style={menuStyles.userInfoText}>
        Welcome, {user?.name || 'Guest'}! 🍋
      </Text>
      <Text style={menuStyles.userInfoSubtext}>
        Explore our delicious menu
      </Text>
    </View>
  );
};

const MenuScreen = ({ navigation }) => {
  const renderItem = ({ item }) => <Item name={item?.name} price={item?.price} />;
  const renderSectionHeader = ({ section: { title } }) => <Text style={menuStyles.itemHeader}>{title}</Text>;

  return (
    <View style={menuStyles.container}>
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
      
      <TouchableOpacity 
        style={menuStyles.nextButton}
        onPress={() => navigation.navigate('Feedback')}
      >
        <Text style={menuStyles.nextButtonText}>Next: Give Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    backgroundColor: '#495E57',
    padding: 20,
    alignItems: 'center',
  },
  userInfoText: {
    color: '#F4CE14',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userInfoSubtext: {
    color: '#EDEFEE',
    fontSize: 14,
    opacity: 0.8,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: 'black',
  },
  headerText: {
    color: 'white',
    fontSize: 40,
    flexWrap: 'wrap',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#000000',
    padding: 10,
  },
  itemHeader: {
    color: 'white',
    fontSize: 24,
    backgroundColor: '#035c06',
    padding: 10,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  itemText: {
    color: '#F4CE14',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#EDEFEE',
  },
  nextButton: {
    backgroundColor: '#F4CE14',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuScreen; 