import {
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebaseconfig";
import { addProductSlice, setProduct } from "./slice";
const COLLECTION_NAME = "products";
const COLLECTION = collection(firestore, COLLECTION_NAME);

export const getCollection = () => {
  return async (dispatch) => {
    const q = query(COLLECTION);

    const querySnapshot = await getDocs(q);
    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
    dispatch(setProduct(arr));
  };
};

export const addProduct = (producto) => {
  return async (dispatch) => {
    const docRef = await addDoc(COLLECTION, {
      ...producto,
    });
    const newObject = { ...producto, id: docRef.id };
    dispatch(addProductSlice(newObject));
  };
};
export const updateProducts = (productosActualizados, id) => {
  return async (dispatch) => {
    dispatch(setProduct(productosActualizados));
    await deleteDoc(doc(firestore, COLLECTION_NAME, id));
  };
};

export const editProducts = (productosActualizados, id, values) => {
  const documentRef = doc(COLLECTION, id);
  return async (dispatch) => {
    dispatch(setProduct(productosActualizados));
    await setDoc(documentRef, values);
  };
};
