import {connect} from 'react-redux'
import {compose} from 'redux'
import {selectIsColletionLoaded} from '../../redux/shop/shop.selector'
import {createStructuredSelector} from 'reselect'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPage from '../../components/collection/collection.component';

const mapStateToProps = createStructuredSelector({
    isLoading:state => !selectIsColletionLoaded(state)
})

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

export default CollectionPageContainer;