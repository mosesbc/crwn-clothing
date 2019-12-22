import React from 'react'
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import {Route} from 'react-router-dom'
import CollectionPage from '../../components/collection/collection.component';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.action'
import {connect} from 'react-redux'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import {selectIsColletionFetching,selectIsColletionLoaded} from '../../redux/shop/shop.selector'
import {createStructuredSelector} from 'reselect'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

//match is available since from App.js shop page was displayed by a route component, so we can do nested route
class ShopPage extends React.Component{
    // shortcut for settings the state, no need to create constructor ; removed now unused
    // state={
    //   loading:true
    // }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props
        fetchCollectionsStartAsync()

        /* moved to fetchCollectionStartAsync
        const collectionRef = firestore.collection('collections')//the name of our collection in firebase , need to edit this to collectionsgit 


        //this promise pattern ,will only be called once upon calling the page
        collectionRef.get().then(snapshot => {
          const collectionMap = convertCollectionsSnapshotToMap(snapshot)
          updateCollections(collectionMap)// all ref was also removed from this class
          this.setState({loading:false})// all ref was also removed from this class
        })
        */

        /* this is the obervable/observer pattern provided by firebase
        //whenever collectionRef updates or run the firsttime
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionMap)
            this.setState({loading:false})
        })
        */

    }

    render(){
      const {match,isCollectionFetching,selectIsColletionLoaded} = this.props
      return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={props=><CollectionOverviewWithSpinner isloading={isCollectionFetching} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={props=><CollectionPageWithSpinner isloading={!selectIsColletionLoaded} {...props}/>} />
      </div>
      )
    }

}

const mapStateToProps = createStructuredSelector({
  isCollectionFetching:selectIsColletionFetching,
  selectIsColletionLoaded:selectIsColletionLoaded
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => {dispatch(fetchCollectionsStartAsync())}
})

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);