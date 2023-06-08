import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from  "./SearchForm";
import JoblyApi from "./api";

function CompanyList () {
    const [searchTerm, setSearchTerm] = useState({});
    const [companies, setCompanies] = useState([])
    
    useEffect(function fetchCompaniesWhenSearched () {
        async function fetchCompanies () {
            let comps
            if (searchTerm != {} && searchTerm.name === ''){
                comps = await JoblyApi.getCompanies()
            }else {
                comps = await JoblyApi.getCompanies(searchTerm);
            }
            setCompanies(comps);
        }
        fetchCompanies();
    }, [searchTerm])

     const searchFunc = (term) => {
        setSearchTerm({name:term})
     }

    return (
        <div>
            <h1>Companies:</h1>
            <SearchForm searchFunc={searchFunc}/>
            <ul>
                {companies.map(c => <li><CompanyCard name={c.name} description= {c.description} handle={c.handle}/></li>)}
            </ul>
        </div>
    )
}

export default CompanyList;