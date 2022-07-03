// import React from 'react';
// import Button from '../../UI/Button/Button';
//
// const OrderSummary = (props) => {
//     const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
//         return (
//             <li key={igKey}>
//                 <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
//             </li>);
//     });
//     console.log('OrderSummary')
// return(
//     <>
//         <h3>Your Order</h3>
//         <p>A delecious burger with the following ingredients:</p>
//         <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
//         <ul>
//             {ingredientSummary}
//         </ul>
//         <p>Continue to Checkout?</p>
//         <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
//         <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
//     </>)
// }
//
// export default OrderSummary;

import React from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {


    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        });

        return (
            <>
                <h3>Your Order</h3>
                <p>A delecious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </>
        );
    }
}

export default OrderSummary;