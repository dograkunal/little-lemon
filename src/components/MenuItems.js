import { View, Text, StyleSheet, FlatList, SectionList } from 'react-native';
import LittleLemonFooter from './LittleLemonFooter';

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
const Header = () => <Text style={menuStyles.headerText}> Menu</Text>;
const Footer = () => <LittleLemonFooter />; 

const MenuItems = () => {
  const renderItem = ({ item }) => <Item name={item?.name} price={item?.price} />;
  const renderSectionHeader = ({ section: { title } }) => <Text style={menuStyles.itemHeader}>{title}</Text>;

  return (
    <View style={menuStyles.container}>
        <SectionList
        sections={menuItemsToDisplay}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={Header}
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
    color: 'black',
    fontSize: 24,
    backgroundColor: '#035c06',
    padding: 10,
    fontWeight: 'semibold',
    textAlign: 'center',
    color: 'white',
},
  itemText: {
    color: '#F4CE14',
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#EDEFEE',
  },
});

export default MenuItems;