import React from 'react'
import {createStructuredSelector} from 'reselect'
import {selectCollections} from '../../redux/shop/shop.selector'
import {connect} from 'react-redux'
import CollectionPreview from '../collection-preview/collection-preview.component'

const CollectionOverview = ({collections}) => (
    <div className='collections-overview'>
    {
        collections.map(({id, ...otherCollectionProps}) =>(
            <CollectionPreview key={id} {...otherCollectionProps} />
        ))
    }
    </div>

)


const mapStateToProps = createStructuredSelector({
    collections:selectCollections
})

export default connect(mapStateToProps)(CollectionOverview);