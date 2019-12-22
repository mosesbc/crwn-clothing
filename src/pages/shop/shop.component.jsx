import React from 'react'
import CollectionsOverviewContainer from '../../components/collection-overview/collection-overview.container'
import {Route} from 'react-router-dom'
import CollectionPageContainer from '../../components/collection/collection.container';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.action'
import {connect} from 'react-redux'

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
      const {match} = this.props
      return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
      )
    }

}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => {dispatch(fetchCollectionsStartAsync())}
})

export default connect(null,mapDispatchToProps)(ShopPage);