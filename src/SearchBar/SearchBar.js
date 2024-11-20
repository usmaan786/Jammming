import React, {useState} from "react";

const SearchBar = ({searchSpotify}) => {
    const [term, setTerm] = useState("");

    const handleTermChange = (event) => {
        setTerm(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        searchSpotify(term);
        setTerm("");
    };
 
    return(
      <div>
          <form onSubmit={handleSubmit}>
              <input type="text" onChange={handleTermChange} value={term} />
              <button type="submit">Search</button>
          </form>
      </div>
  );
}

export default SearchBar;