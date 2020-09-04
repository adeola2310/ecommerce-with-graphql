import React from 'react';

import {Query} from "react-apollo";
import {gql} from "apollo-boost";

import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";


const GET_COLLECTION = gql`
{
collections{
id
title
items{
id
name
price
imageUrl

}
}
}
`

const CollectionOverviewContainer = ()=>(
<Query query={GET_COLLECTION}>
    {
        ({loading, data})=>{
            if (loading) return <Spinner/>;
            return <CollectionsOverview collections={data.collections}/>
        }
    }
</Query>

);


export default CollectionOverviewContainer;