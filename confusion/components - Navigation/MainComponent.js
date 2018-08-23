import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import { View, Platform } from "react-native";
import { createStackNavigator, createDrawerNavigator } from "react-navigation"; 
import Home from './HomeComponent';
import { Icon } from "react-native-elements";

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu }, 
    DishDetail: {screen: DishDetail}
}, 
{
    initialRouteName: 'Menu', 
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        }, 
        headerTintColor: '#FFF', 
        headerTitleStyle: {
            color: '#FFF'
        }

    }
}
); 

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        }, 
        headerTitleStyle: {
            color: "#fff"
        }, 
        headerTintColor: "#fff"
    })
}); 
const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator, 
        navigationOptions: {
            title: 'Home', 
            drawerLabel: 'Home'
        }
    }, 
    Menu: {
        screen: MenuNavigator, 
        navigationOptions: {
            title: 'Menu', 
            drawerLabel: 'Menu'
        }
    }
}, {
    drawerBackgroundColor: '#D1C4E9'
}); 


class Main extends Component {
    constructor(props){
        super(props); 
        this.state={
            dishes:DISHES, 
            selectedDish: null
        }; 
    }
    onDishSelect(dishId){
        this.setState({selectedDish:dishId})
    }

    render(){
        return(
            <View style={{ flex : 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        ); 
    }
}

export default Main; 