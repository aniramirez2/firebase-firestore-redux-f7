import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import { setError, setIsAuthenticate, setUser } from "./slice";

export const loginGoogle = () => {
  const provider = new GoogleAuthProvider();
  return async (dispatch) => {
    try {
      const userCredencial = await signInWithPopup(auth, provider);
      console.log(userCredencial);
      if (userCredencial) {
        dispatch(setIsAuthenticate(true));
        dispatch(setUser(userCredencial.user));
      }
    } catch (error) {
      dispatch(setIsAuthenticate(false));
      dispatch(
        setError({ error: true, code: error.code, message: error.message })
      );
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(setIsAuthenticate(false));
      dispatch(setUser(null));
    } catch (error) {
      setError({ error: true, code: error.code, message: error.message });
    }
  };
};
