import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebaseconfig";
import { setProduct } from "./slice";
const COLLECTION_NAME = "products";
const COLLECTION = collection(firestore, COLLECTION_NAME);

export const getCollection = () => {
  return async (dispatch) => {
    const q = query(collection(firestore, COLLECTION_NAME));

    const querySnapshot = await getDocs(q);
    console.log("productos del firestore", querySnapshot);
    const arr = [];
    querySnapshot.forEach((doc) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
    dispatch(setProduct(arr));
  };
};

export const addProduct = (producto) => {
  console.log("producto", producto)
  return async (dispatch) => {
    const docRef = await addDoc(COLLECTION, {
      ...producto,
    });
    console.log("Document written with ID: ", docRef);
    const newObject = { ...producto, id: docRef.id };
    // esta respuesta es un objeto de referencia de firestore que solo contiene el id nuevo
    dispatch(addProduct(newObject));
  };
};

const editProduct = () => {}; 
// 1. traer la referencia del documento docRef
// 2. usar el set doc con esa referencia
// 3. mandar el dispatch al store

const deleteProduct = () => {}; 
// 1. traer la referencia del documento docRef
// 2. delete doc o algo similar
// 3. mandar el dispatch al store de delete product