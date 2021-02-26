import axios from 'axios';
import { FETCH_USER } from './types';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Payments from '../components/Payments';

export const fetchUser = () => async dispatch => {
        const res = await axios.get('/api/current_user');
        dispatch({type: FETCH_USER, payload: res.data});
    };

export const handleToken = token => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({type: FETCH_USER, payload: res.data});
};

export default connect(null, actions)(Payments);