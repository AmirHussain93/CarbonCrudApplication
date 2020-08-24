import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import thunk from 'redux-thunk'

// const store = createStore(rootReducer, applyMiddleware(thunk))

// export default store

export const middlewares = [thunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

const store = createStoreWithMiddleware(rootReducer); 

export default  store