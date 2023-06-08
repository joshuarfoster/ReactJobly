import React from "react";
import {Link} from "react-router-dom";

function CompanyCard({name, description, handle}) {
    return (
        <Link to = {`/companies/${handle}`}>
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </Link>
    )
}

export default CompanyCard;