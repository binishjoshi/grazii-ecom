import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { 
	auth, 
	googleProvider, 
	createUserProfileDocument,
	getCurrentUser
} from '../../firebase/firebase.utils';

import { 
	signInSuccess, 
	signInFailure,
	signOutSuccess,
	signOutFailure,
	signUpFailure,
	signUpSuccess
} from './user.actions';

export function* getSnapshotFromAuth(userAuth, additionalData) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const userSnapshot = yield userRef.get();
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}));
	} catch(e) {
		yield put(signInFailure(e));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromAuth(userAuth);
	} catch(e) {
		yield put(signInFailure(e));
	}
};

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

export function* signInAfterSignUp({ payload: { user, additionalData }}) {
	yield getSnapshotFromAuth(user, additionalData);
};

export function* signUp({ payload: { email, password, displayName }}) {
	try {
	  const { user } = yield auth.createUserWithEmailAndPassword(email, password);
	  yield put(signUpSuccess({ user, additionalData: { displayName } }))
	} catch(e) {
		yield put(signUpFailure(e));
	}
};

export function* signOut () {
	try {
		yield auth.signOut();
		yield put(signOutSuccess());
	} catch(e) {
		yield put(signOutFailure(e));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, )
};

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
};

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(isUserAuthenticated),
		call(onSignOutStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
};