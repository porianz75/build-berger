import React, { Component } from 'react';
import Order from '../../components/order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }
    render () {
        let orders =this.props.loading ? <Spinner /> : <h1>سفارشی داده نشده</h1>;

        console.log(this.props )
        if ( !this.props.loading && this.props.orders.length > 0 ) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }

        return (
            <div>
                {orders}
            </div>
        );
    }}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
