import styles from './Bar.module.scss';

const Bar = (props) => {
    
    const isValid = false;

    return (
        <div className = {`${styles['bar-main']} ${!isValid && styles.invalid}` }>
        <button className={styles.bar} type={props.type}  onClick={props.onClick}>
            {props.children}
        </button>
        </div>

    )
}
export default Bar
