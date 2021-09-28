import { useState, useContext, useEffect, useCallback } from 'react';
import TestMoviesList from './TestMoviesList';

const FetchCheck = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setIsError] = useState(null);





    //Use callbacks when you want to prevent them to run infitely
    const fetchMoviesHandler = useCallback( async () =>{
        setIsLoading(true);
        setIsError(null);
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            const data = await response.json();

            if (!response.ok) {
                throw new Error("Something is wrong");
            };

            const transformedMovies = data.results.map((movieData) => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    movieText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                };
            },[]);
            setMovies(() => transformedMovies);
        } catch (error) {
            setIsError(error.message);
        }
        setIsLoading(() => false);
    });


    useEffect(() => {
        fetchMoviesHandler();
    }, [fetchMoviesHandler]);

    let content = <p>Found no movies</p>;

    if (movies.length > 0) {
        content = props.children;
    }
    if (error) {
        content = <p>{error}</p>;
    }

    if (isLoading) {
        content = <p>Loading...</p>;
    }
    return (
      <>
        <section>
          <button onClick={fetchMoviesHandler}>fetch movies</button>
        </section>
        <section>{content}</section>
      </>
    );
}

export default FetchCheck
