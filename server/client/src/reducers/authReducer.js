//모든 정보=statㄷ, action을 받는다.
import { FETCH_USER } from '../actions/types';

const auth = (state=null, action) => {
    console.log(state);
    switch(action.type){
        case FETCH_USER:
            return action.payload.data || false;
        default:
            return state;
    }
};

export default auth;