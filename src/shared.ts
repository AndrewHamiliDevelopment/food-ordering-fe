import firebase from 'firebase';

export const firebaseSignInWithEmailAndPassword = async (props: {email: string; password: string}) => {
    const {email, password} = props;
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('Signed in', user);
}