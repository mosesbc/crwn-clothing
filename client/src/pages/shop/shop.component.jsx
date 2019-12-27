import React,{useEffect} from 'react'
import CollectionsOverviewContainer from '../../components/collection-overview/collection-overview.container'
import {Route} from 'react-router-dom'
import CollectionPageContainer from '../../components/collection/collection.container';
import {fetchCollectionsStart} from '../../redux/shop/shop.action'
//import {fetchCollectionsStartAsync} from '../../redux/shop/shop.action'
import {connect} from 'react-redux'

//match is available since from App.js shop page was displayed by a route component, so we can do nested route
const ShopPage = ({fetchCollectionsStart,match}) => {
    // shortcut for settings the state, no need to create constructor ; removed now unused
    // state={
    //   loading:true
    // }

    useEffect(()=>{
      fetchCollectionsStart()
    },[fetchCollectionsStart])//to avoid that warning put the function (fetchCollectionsStart), since we know the function not change


    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
      )

}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => {dispatch(fetchCollectionsStart())}
})

export default connect(null,mapDispatchToProps)(ShopPage);