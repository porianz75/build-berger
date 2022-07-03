
import React, { Component } from 'react';
import CheckoutSummary from '../../components/order/CheckoutSummary/CheckoutSummary';
import hookWrapper from "../../hoc/hookWrapper/hookWrapper";
import ContactData from "../ContactData/ContactData";
import {Route,Routes} from "react-router-dom";
import { connect } from 'react-redux';



class Checkout extends Component {

    checkoutCancelledHandler = () => {
    this.props.navigate(-1)
    }
    checkoutContinuedHandler = () => {
   this.props.navigate('/checkout/contact-data',{replace:true})
    }

    render () {
        let summary = <this.props.Navigate to="/" />
        if ( this.props.ings ) {
            const purchasedRedirect = this.props.purchased ? <this.props.Navigate to="/"/> : null;

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Routes>
                        <Route
                            path= {'contact-data'}
                            element={<ContactData/>} />
                    </Routes>
                </div>
            );
        }
        return summary;
    }
}



const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(hookWrapper(Checkout));

