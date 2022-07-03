import React from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions  from '../../store/actions/index';


class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //modal
            purchasing: false,
        }
    }

    componentDidMount() {
    this.props.onInitIngredients ()
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();

        this.props.navigate('/checkout')
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum >0;
    }

    render() {
       // console.log('berger',this.props.Adispatch)
      //  console.log('berger',this.props.Astate)
        // disable & enable for add / remove each ingredients button
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // set loading if  data fetch to server

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : (
            <div style={{position:'fixed',top:0,right:0,left:0,bottom:0,display:'flex',alignItems:'center'}}><Spinner /></div>
        );

        let purchasable=false;
        if (this.props.ings) {
            // start  checking  disable or enable button order//
            // const sum = Object.keys(this.props.ings).map(igKey => {
            //     return this.props.ings[igKey];
            // }).reduce((sum, el) => {
            //     return sum + el;
            // }, 0);
            // purchasable = sum > 0
            // end  checking  disable or enable button order//

            burger = (
                <>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />;
        }
        //
        // if (this.state.loading) {
        //     orderSummary = <Spinner />;
        // }
        return (
            <>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </>
        );

    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));
