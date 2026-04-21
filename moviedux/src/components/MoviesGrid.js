import React, {useState } from "react";
import '../styles.css';
import MoviesCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
      const[searchTerm, setSearchTerm] = useState('');

      const[genres, setGenres] = useState("All Genres");
      const[rating, setRating] = useState("All");

      const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
      }

      const handleGenreChange = (e) => {
            setGenres(e.target.value);
      }

        const handleRatingChange = (e) => {
                setRating(e.target.value);
        }

        const matchesGenre = (movie, genre) => {
            return(genre === "All Genres" || movie.genre.toLowerCase() === genre.toLowerCase());
        }

        const matchesSearchTerm = (movie, searchTerm) => {
            return(movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        const matchesRating = (movie, rating) => {
            switch(rating) {
                case "All":
                    return true;

                case "Good":
                    return movie.rating >= 8;

                case "OK":
                    return movie.rating >= 5 && movie.rating < 8;

                case "Bad":
                    return movie.rating < 5;

                default:
                    return false;
            }
        }

      const filteredMovies = movies.filter((movie) =>
                    matchesGenre(movie, genres) &&
                    matchesRating(movie, rating) &&
                    matchesSearchTerm(movie, searchTerm)
      );

      return(
            <div>
                  <input 
                        type="text"
                        className="search-input"
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                  />

                  <div className="filter-bar">
                       <div className="filter-slot">
                            <label>Genre:</label>
                            <select
                                    className="filter-dropdown"
                                    value={genres}
                                    onChange={handleGenreChange}
                            >
                                    <option>All Genres</option>
                                    <option>Action</option>
                                    <option>Drama</option>
                                    <option>Fantasy</option>
                                    <option>Horror</option>
                            </select>
                       </div>

                          <div className="filter-slot"> 
                            <label>Rating:</label>
                            <select
                                    className="filter-dropdown"
                                    value={rating}
                                    onChange={handleRatingChange}>
                                    <option>All</option>
                                    <option>Good</option>
                                    <option>OK</option>
                                    <option>Bad</option>
                            </select>   
                        </div>
                    </div>
                  
                  <div className="movies-grid">
                        {filteredMovies.map(movie => (
                              <MoviesCard
                               key={movie.id} 
                              movie={movie} 
                              toggleWatchlist={toggleWatchlist}
                              isWatchlisted={watchlist.includes(movie.id)}/>
                        ))}
                  </div>
        </div>     
        );
}