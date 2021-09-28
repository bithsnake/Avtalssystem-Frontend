import {Link} from 'react-router-dom'
const LoginAuhtorizer = (props) => {
    const isValid = props.isValid;
    return (
        <>
            {
                
                isValid && <Link to="/main"></Link>
            }
      </>
    );
}

export default LoginAuhtorizer
