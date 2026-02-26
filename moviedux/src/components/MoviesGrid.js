import React, {useState, useEffect} from "react";
import '../styles.css';
import MoviesCard from "./MovieCard";

export default function MoviesGrid() {

      const [movies, setMovies] = useState([]);
      const[searchTerm, setSearchTerm] = useState('');
      
      useEffect(() => {
            fetch("movies.json")
            .then(response => response.json())
            .then(data => setMovies(data));
      }, []);

      const handleSearchChange = (e) => {
          setSearchTerm(e.target.value);
      }

      const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return(
            <div>
                  <input 
                        className="search-input"
                        type="text" 
                        placeholder="Search movies..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                  />
                  <div className="movies-grid">
                   {
                        filteredMovies.map(movie => (
                              <MoviesCard key={movie.id} movie={movie}/>
                        ))
                     }
                   </div>     
            </div>
           
      );
} 