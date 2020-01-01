import React from 'react';
import { Route } from 'react-router-dom';

import CollectionPage from '../../pages/collection/collection.component';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

class ShopPage extends React.Component {
	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const collectionRef = firestore.collection('collections');

		collectionRef.onSnapshot(async snapshot => {
			convertCollectionsSnapshotToMap(snapshot);
		})
	}

	render() {
		const { match } = this.props;
		return (
	    <div className='shop-page'>
	        <Route exact path={`${match.path}`} component={CollectionOverview} />
	        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
	    </div>
		);
	}
} 

export default ShopPage;