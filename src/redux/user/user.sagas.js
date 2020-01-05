import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils';

import { 
	signInSuccess, 
	signInFailure,
} from './user.actions';

export function* getSnapshotFromAuth(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);
		const userSnapshot = yield userRef.get();
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
	} catch(e) {
		yield put(signInFailure(e));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromAuth(user);
	} catch(e) {
		yield put(signInFailure(e));
	}
};

export function* signInWithEmail({ payload: { email, password} }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);		
		yield getSnapshotFromAuth(user);
	} catch(e) {
		yield put(signInFailure(e));
	}
};

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
};

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart)
	]);
};