import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";

import "./styles.css";
//const variable to hold the action type
const ADD_ITEM = "ADD_ITEM";
const DELETE_ITEM = "DELETE_ITEM";
const SET_FILTER = "SET_FILTER";
const SET_DISCOUNT = "SET_DISCOUNT";

//action, just returns an object with type and state variable
let action = {
  type: ADD_ITEM,
  item: "pineapple"
};

//action creator which does some action and returns action object
const addItem = (name, price) => {
  return {
    type: ADD_ITEM,
    item: {
      name: name,
      price: price
    }
  };
};

const deleteItem = index => {
  return {
    type: DELETE_ITEM,
    index: index
  };
};

const setFilter = filter => {
  return {
    type: SET_FILTER,
    filter: filter
  };
};

const setDiscount = discount => {
  return {
    type: SET_DISCOUNT,
    discount: discount
  };
};

//reducer which updates the store state variables
//by making a new copy with exisisting store variables
// and appending the new item -
//is a pure function as it doesnot overwrite
let initialState = {
  items: [{ name: "pineapple", price: 3.5 }],
  filter: "none",
  discount: 0
};
// const giantReducer = (state=initialState, action) => {
//   switch (action.type) {
//     case ADD_ITEM:
//       return Object.assign({},state,{items:[...state.items,action.item]});
//     case DELETE_ITEM:
//       return Object.assign({},state,{items:[
//         ...state.slice(0,action.index),
//         ...state.slice(action.index+1)]})
//     case SET_FILTER:
//       return Object.assign({},state,{filter:action.filter})
//     case SET_DISCOUNT:
//       return Object.assign({},state,{discount:action.discount})
//     default:
//       return state;
//   }
// }

//store -single source of truth in redux
//second parameter can be initial state
//third parameter can be middle-ware as redux-thunk
// const store = createStore(giantReducer)

//items reducer
const items = (state = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.item];
    case DELETE_ITEM:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
};

//filter reducer
const filter = (state = "none", action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
};

//discount reducer
const discount = (state = 0, action) => {
  switch (action.type) {
    case SET_DISCOUNT:
      return action.discount;
    default:
      return state;
  }
};

// const giantReducer2= (state=initialState,action) => {
//   return {
//     items:items(state.items,action),
//     filter:filter(state.filter,action),
//     discount:discount(state.discount,action)
//   }
// }

// const store = createStore(giantReducer2)

const combinereducer = combineReducers({
  items: items,
  filter: filter,
  discount: discount
});
const store = createStore(combinereducer);
const unsub = store.subscribe(() => {
  console.log(store.getState());
});

console.log(store.getState());
store.dispatch(addItem("apple", 2));
store.dispatch(addItem("banana", 0.5));
store.dispatch(addItem("mango", 3));
store.dispatch(setFilter("alphabetical"));
store.dispatch(setDiscount(20));

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
