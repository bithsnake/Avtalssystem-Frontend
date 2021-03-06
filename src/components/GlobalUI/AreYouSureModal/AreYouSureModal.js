import classes from './AreYouSureModal.module.css';
import { Fragment } from 'react';
import React from 'react';

const Backdrop = (props) => {
    return <div className={classes.backdrop}></div>
}

ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalElement = document.getElementById('overlays');

const AreYouSureModal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop />,portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </Fragment>
    )
}

export default AreYouSureModal
