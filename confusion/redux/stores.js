import * as ActionTypes from "./ActionTypes";

export const dishes = (state = {
    isLoading: true, 
    errMess: null, 
    dishes:[{name:null, image:null, description: null, featured: true}]}, action) => {
        switch (action.type) {
            case ActionTypes.ADD_DISHES:
            return{...state, isLoading:false, errMess:null, dishes:action.payload}; 
                
            case ActionTypes.DISHES_LOADING: 
            return {...state, isLoading:true, errMess:null, dishes:[{name:null, image:null, description: null, featured: true}]}

            case ActionTypes.DISHES_FAILED: 
            return { ...state, isLoading:false, errMess:action.payload}
        
            default:
                return state; 
        }
    };




export const comments = (state = {
    isLoading: true, 
    errMess: null, 
    comments:[{name:null, image:null, description: null, featured: true}]}, action) => {
        switch (action.type) {
            case ActionTypes.ADD_COMMENTS:
            return{...state, errMess:null, comments:action.payload}; 
                

            case ActionTypes.COMMENTS_FAILED: 
            return { ...state, errMess:action.payload, comments:[{name:null, image:null, description: null, featured: true}]}
        
            default:
                return state; 
        }
    };


export const leaders = (state = {
    isLoading: true, 
    errMess: null, 
    leaders:[{name:null, image:null, description: null, featured: true}]}, action) => {
        switch (action.type) {
            case ActionTypes.ADD_LEADERS:
            return{...state, isLoading:false, errMess:null, leaders:action.payload}; 
                
            case ActionTypes.LEADERS_LOADING: 
            return {...state, isLoading:true, errMess:null, leaders:[{name:null, image:null, description: null, featured: true}]}

            case ActionTypes.LEADERS_FAILED: 
            return { ...state, isLoading:false, errMess:action.payload}
        
            default:
                return state; 
        }
    };


export const promotions = (state = {
    isLoading: true, 
    errMess: null, 
    promotions:[{name:null, image:null, description: null, featured: true}]}, action) => {
        switch (action.type) {
            case ActionTypes.ADD_PROMOS:
            return{...state, isLoading:false, errMess:null, promotions:action.payload}; 
                
            case ActionTypes.PROMOS_LOADING: 
            return {...state, isLoading:true, errMess:null, promotions:[{name:null, image:null, description: null, featured: true}]}

            case ActionTypes.PROMOS_FAILED: 
            return { ...state, isLoading:false, errMess:action.payload}
        
            default:
                return state; 
        }
    };