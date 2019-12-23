import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'
import {selectIsColletionFetching} from '../../redux/shop/shop.selector'
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionOverview from '../../components/collection-overview/collection-overview.component'

const mapStateToProps = createStructuredSelector({
    isLoading:selectIsColletionFetching
})
//hard to read , mostly if you add withRouter; equivalent to compose below without withRouter
//const CollectionsOverviewContainer = withRouter(connect(mapStateToProps)(WithSpinner(CollectionOverview)))

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview)

export default CollectionsOverviewContainer