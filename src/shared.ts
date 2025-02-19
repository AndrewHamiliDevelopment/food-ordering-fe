import firebase from 'firebase';

export const firebaseSignInWithEmailAndPassword = async (props: {email: string; password: string}) => {
    const {email, password} = props;
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log('Signed in', user);
}

export const formatNumberCurrency = (num: number): string => {
    const numberFormatOptions: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      style: 'currency',
      currency: 'PHP',
    };
    return num.toLocaleString('en-US', numberFormatOptions);
  };