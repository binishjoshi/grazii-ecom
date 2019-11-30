import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollections } from '../../redux/shop/shop.selectors'

import CollectionPreview from '../collection-preview/collection-preview.component';

import './collection-overview.styles.scss';

const CollecionOverview = ({collections}) => (
    <div className='collection-overview'>
        {
            collections.map(({id, ...otherCollectionProps}) => (
                <CollectionPreview key = {id} {...otherCollectionProps}/>
            ))
        }
    </div>
);

const mapStateToStateToProps = createStructuredSelector({
    collections: selectCollections
});

export default connect(mapStateToStateToProps)(CollecionOverview);