import React from 'react';
import classes from './Modal.module.css';
import Backdrop from "../Backdrop/Backdrop";

// const Modal = (props) => {
//     console.log('modal')
//     return (
// <>
//     <Backdrop show={props.show}  clicked={props.modalClosed}/>
//     <div className={classes.Modal} style={{
//         transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//         opacity: props.show ? '1' : '0'
//     }}>
//         {props.children}
//     </div>
// </>)};
//
// export default Modal;

class Modal extends React.Component{

    shouldComponentUpdate=(nextProps, nextState)=> {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }


    render() {
        return (
            <>
                <Backdrop show={this.props.show}  clicked={this.props.modalClosed}/>
                <div className={classes.Modal} style={{
                    transform: this.props.show ? 'translate(-50%,-50%)' : 'translate(-50%,-200vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </>)}
    }

export default Modal;
