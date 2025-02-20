import firebase from 'firebase';

export const firebaseSignInWithEmailAndPassword = async (props: {email: string; password: string}) => {
    const {email, password} = props;
    try{
      const user = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('Signed in', user);
    } catch (error) {
      console.error('sign-in error', error);
    }
}

export const firebaseSignUp = async (props: {email: string; password: string}) => {
  const {email, password} = props;
  try {
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log('User Created', user);
  } catch (error) {
    console.error('sign-up error', error);
    window.alert(JSON.stringify(error));
  }
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