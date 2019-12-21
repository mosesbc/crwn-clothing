import React from 'react'
import CollectionOverview from '../../components/collection-overview/collection-overview.component'
import {Route} from 'react-router-dom'
import CollectionPage from '../../components/collection/collection.component';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'
import {updateCollections} from '../../redux/shop/shop.action'
import {connect} from 'react-redux'
import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

//match is available since from App.js shop page was displayed by a route component, so we can do nested route
class ShopPage extends React.Component{
    // shortcut for settings the state, no need to create constructor
    state={
      loading:true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const collectionRef = firestore.collection('collections')//the name of our collection in firebase , need to edit this to collectionsgit 
        const {updateCollections} = this.props

        //whenever collectionRef updates or run the firsttime
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionsSnapshotToMap(snapshot)
            updateCollections(collectionMap)
            this.setState({loading:false})
        })

    }

    render(){
      const {match} = this.props
      const {loading} = this.state
      return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={props=><CollectionOverviewWithSpinner isloading={loading} {...props}/>} />
        <Route path={`${match.path}/:collectionId`} render={props=><CollectionPageWithSpinner isloading={loading} {...props}/>} />
      </div>
      )
    }

}

const mapDispatchToProps = (dispatch) => ({
    updateCollections:collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);