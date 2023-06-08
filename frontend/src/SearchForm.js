import React, { useState } from "react";

function SearchForm ({searchFunc}) {
    
    const [inputValue, setInputValue] = useState ('')

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        searchFunc(inputValue);
        setInputValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name='searchTerm' placeholder="Enter search term.." onChange={handleChange}/>
            <input type="submit"/>
        </form>
    )
};

export default SearchForm;