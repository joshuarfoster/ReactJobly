import React, { useEffect, useState } from "react";
import JobCard from "./JobCard"
import SearchForm from "./SearchForm"
import JoblyApi from "./api"

function JobList () {
    const [searchTerm, setSearchTerm] = useState({})
    const [jobs, setJobs] = useState([])

    useEffect(function fetchJobsWhenSearched () {
        async function fetchJobs () {
            let jobs;
            if (searchTerm != {} && searchTerm.title === ''){
                jobs = await JoblyApi.getJobs()
            }else {
                jobs = await JoblyApi.getJobs(searchTerm)
            }
            setJobs(jobs)
        }
        fetchJobs()
    }, [searchTerm])

    const searchFunc = (term) => {
        setSearchTerm({title:term})
    }

    return (
        <div>
            <h3>Jobs:</h3>
            <SearchForm searchFunc={searchFunc}/>
            {jobs.map(j => <JobCard title={j.title} id={j.id} salary={j.salary} equity={j.equity} companyName={j.companyName}/>)}
        </div>
    )
}

export default JobList;