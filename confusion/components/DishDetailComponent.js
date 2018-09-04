import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Button, Modal, StyleSheet } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { postFavorite, postComment } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.dishes, 
        comments: state.comments, 
        favorites: state.favorites
    }
}

const mapDispatchToProps = (dispatch) => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)), 
    postComment: (dishId, comment, author, rating) => dispatch(postComment(dishId, comment, author, rating))
})
function RenderDish(props) {
    const dish = props.dish; 
    if (dish != null){
        console.log(dish)
        return(
            <Card 
            featuredTitle={dish.name}
            image={{uri: baseUrl + dish.image}}>
            <Text style={{margin:10}}>
                {dish.description}
            </Text>
            <View style={styles.formRow}>
            <Icon 
            raised
            reverse
            name={props.favorite ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50' 
            onPress={() => props.favorite ? console.log('Already fav') : props.onPress()}
            />
            <Icon 
            raised
            reverse
            name={'pencil'}
            type='font-awesome'
            color = '#512DA8'
            onPress={()=> props.onToggleModal()}
            /></View>
            </Card>
        )
    } else {
        return(
            <View></View>
        )
    }
    
}

function RenderComments(props) {
    const comments = props.comments; 
    const renderCommentItem = ({item, index})=>{
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating imageSize={14} readonly startingValue={item.rating}/>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        ); 
    }; 
    return (
        <Card title ='Comments'>
        <FlatList
        data={comments} 
        renderItem={renderCommentItem}
        keyExtractor={item=> item.id.toString()}
        />
        </Card>
    ); 
}
class DishDetail extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,  
            comment: '', 
            author: '', 
            rating: 5
        }
    }
    static navigationOptions ={
        title: 'Dish Details'
    }; 
    markFavorite(dishId){
        this.props.postFavorite(dishId); 
    }

    addComment(dishId, comment, author, rating){
        var date = new Date()
        this.props.postComment(dishId, rating, comment, author, date.toISOString())
    }
    
    toggleModal (){
            this.setState({showModal: !this.state.showModal})
        } 
        ratingCompleted(rating){
            console.log("Rate is" + rating)
        }
    render(){
        console.log(this.state)
        const dishId = this.props.navigation.getParam('dishId', ''); 
        return(
            <ScrollView>
            <RenderDish dish={this.props.dishes.dishes[+dishId]}
            favorite={this.props.favorites.some(el => el === dishId)}
            onPress={() => this.markFavorite(dishId)}
            onToggleModal={()=>this.toggleModal()}
             />
             <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
             <Modal 
             animationType={"fade"}
             transparent={false} 
             visible={this.state.showModal}
             onDismiss={()=> this.toggleModal()} 
             onRequestClose={() => this.toggleModal()}
             >
                <View style={styles.formModal}>
                    <Rating showRating 
                    type="star" 
                    fractions={0}
                    startingValue={4}
                    onFinishRating={(rating) => this.setState({rating: rating})}
                    imageSize={20}
                    showRating 
                    ratingTextColor = '#f1c40f'
                    style={styles.formModal}

                    />
                    </View>
                <View style={styles.formModal}>
                <Input  
                placeholder='Author'
                leftIcon = {
                <Icon
                    name={'user-o'}
                    type = 'font-awesome'
                    size={24}
                    color='black'
                    />
                }
                onChangeText={(author) => this.setState({author: author})}
                
                />
                </View>
                <View style={styles.formModal}>
                    <Input  
                    placeholder='Comment'
                    leftIcon = {
                    <Icon
                        name = {'comment-o'}
                        type = 'font-awesome'
                        size={24}
                        color='black'
                        />
                    }
                    onChangeText={(comment) => this.setState({comment: comment})}
                    
                    />
                </View>
                <View style={styles.formModal}>
                <Button 
                    large
                    onPress={(val)=> {this.toggleModal(); this.addComment(val)}}
                    title = "SUBMIT"
                    color = "#512DA8"
                    style={styles.buttonModal}
                    />
                </View>
                <View style={styles.formModal}>
                    <Button 
                    large
                    color = "#444444"
                    onPress={()=> {this.toggleModal()}}
                    title = "CANCEL" 
                    />
                </View>
             </Modal>
             </ScrollView>
        )
   }
    
}

const styles = StyleSheet.create({
            formRow: {
            alignItems: 'center',
            justifyContent: 'center', 
            flex: 1, 
            flexDirection:'row'
        },
            formModal: {
                margin: 5
            }
    })

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail); 