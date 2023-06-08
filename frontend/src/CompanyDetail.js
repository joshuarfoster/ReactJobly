import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import JoblyApi from './api'
import JobCard from "./JobCard"

function CompanyDetails ( ) {
    const { handle } = useParams()
    const [company, setCompany] = useState({})
    const [jobs, setJobs] = useState([])

    useEffect(function fetchCompanyWhenMounted () {
        async function fetchCompany () {
            let comp = await JoblyApi.getCompany(handle);
            setCompany(comp)
            setJobs(comp.jobs)
        }
        fetchCompany()
    },[])

console.log(company)

    return (
        <div>
            <h1>{company.name}</h1>
            <h4>{company.description}</h4>
            <h5>Jobs:</h5>
            <div>{jobs.map(j =>  <JobCard title={j.title} id={j.id} salary={j.salary} equity={j.equity} companyName={j.companyName}/>)}</div>
        </div>
    )
}

export default CompanyDetails