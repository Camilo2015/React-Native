import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Home from './HomeComponent';
import Contact from "./ContactComponent";
import AboutUs from "./AboutUsComponent";
import { View, Platform, Text, ScrollView, Image, StyleSheet } from "react-native";
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from "react-navigation"; 
import { Icon } from "react-native-elements";
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators'; 

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={StyleSheet.container} forceInset={{ top: 'always', horizontal:'never'}}>
        <View style={styles.drawerHeader}>
            <View style={{flex: 1}}>
            <Image source={require('./images/logo.png')} style={styles.drawerImage}/>
            </View>
            <View style={{flex:2}}>
                <Text style={styles.drawerHeaderText}> Ristorante Con Fusion</Text>
            </View>
        </View>
        <DrawerItems {...props}/>
        </SafeAreaView>
    </ScrollView>
)

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu, 
    navigationOptions: ({ navigation }) => ({
        headerLeft: <Icon name='menu' size={24} 
        color='white'
        iconStyle={{ marginLeft:6 }}
        onPress={() => navigation.toggleDrawer()}/>
    })
}, 
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
    Home: { screen: Home, 
    navigationOptions: ({ navigation }) => ({
        headerLeft: <Icon name='menu' size={24} 
        color='white'
        iconStyle={{ marginLeft:6 }}
        onPress={() => navigation.toggleDrawer()}/>
    }) }
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

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact, 
    navigationOptions: ({ navigation }) => ({
        headerLeft: <Icon name='menu' size={24} 
        color='white'
        iconStyle={{ marginLeft:6 }}
        onPress={() => navigation.toggleDrawer()}/>
    }) }
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

const AboutNavigator = createStackNavigator({
    About: { screen: AboutUs, 
    navigationOptions: ({ navigation }) => ({
        headerLeft: <Icon name='menu' size={24} 
        color='white'
        iconStyle={{ marginLeft:6 }}
        onPress={() => navigation.toggleDrawer()}/>
    })}
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
            drawerLabel: 'Home', 
            drawerIcon: ({tintColor, focused}) =>(
                <Icon 
                name='home'
                type='font-awesome'
                size={24}
                color={tintColor}
                />
            ), 
        }
    }, 
    About: {
                screen: AboutNavigator,
                navigationOptions: {
                    title: 'About',
                    drawerLabel: 'About Us', 
                    drawerIcon: ({tintColor, focused}) =>(
                <Icon 
                name='info-circle'
                type='font-awesome'
                size={24}
                color={tintColor}
                />
            ),
                }
           }, 
    Menu: {
        screen: MenuNavigator, 
        navigationOptions: {
            title: 'Menu', 
            drawerLabel: 'Menu', 
            drawerIcon: ({tintColor, focused}) =>(
                <Icon 
                name='list'
                type='font-awesome'
                size={24}
                color={tintColor}
                />
            ),
        }
    }, 
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact Us', 
            drawerIcon: ({tintColor, focused}) =>(
                <Icon 
                name='address-card'
                type='font-awesome'
                size={24}
                color={tintColor}
                />
            ),
        }
    }, 
}, {
    drawerBackgroundColor: '#D1C4E9', 
    contentComponent: CustomDrawerContentComponent
}); 

const styles= StyleSheet.create({
    container:{
        flex:1
    }, 
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    }, 
    drawerHeaderText:{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    }, 
    drawerImage:{
        margin: 10,
        width: 80,
        height: 60
    }
}); 

class Main extends Component {
        componentDidMount() {
         this.props.fetchDishes();
         this.props.fetchComments();
         this.props.fetchPromos();
         this.props.fetchLeaders();
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);