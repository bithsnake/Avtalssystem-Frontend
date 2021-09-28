import {Toast} from 'react-bootstrap';

const TestMoviesList = (props) => {
    return (
        <div>
            <Toast>
                <Toast.Header>{props.title}</Toast.Header>
                <Toast.Body>{props.movieText}</Toast.Body>
            </Toast>
        </div>
    )
}
export default TestMoviesList