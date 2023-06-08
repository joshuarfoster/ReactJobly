import React from "react";

function JobCard ({title,id,salary,equity,companyName}) {
    return (
        <div>
            <h3>{title}</h3>
            <h4>{companyName}</h4>
            <ul>
                <li>salary: {salary}</li>
                <li>equity: {equity}</li>
            </ul>
        </div>
    )
}

export default JobCard;