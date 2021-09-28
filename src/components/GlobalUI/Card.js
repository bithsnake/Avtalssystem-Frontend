import './Card.css';

const Card = (props) => {
    //use the normal css styling card
    //and other ones if you want to by
    //adding the props.className after the the default styling
    const classes = 'card ' + props.className;
    return ( 
        //If you want to wrap another component inside a component, use children
        <div className ={classes}>{props.children}</div>
    )
}
export default Card