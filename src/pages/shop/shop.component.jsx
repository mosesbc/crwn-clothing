import React from 'react'
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import {Route} from 'react-router-dom'
import CollectionPage from '../../components/collection/collection.component';

//match is available since from App.js shop page was displayed by a route component, so we can do nested route
const ShopPage = ({match}) => (
    <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
    </div>
)

export default ShopPage;