import { useSelector, useDispatch } from "react-redux";
import { loginGoogle, logout } from "../redux/users/thunks";

function Login() {
  const { user } = useSelector((userReducer) => userReducer.user);
  const dispatch = useDispatch();

  return (
    <>
      <div>login</div>
      {user ? (
        <>
          <h1>Bienvenido {user.displayName}</h1>
          <button type="button" onClick={() => dispatch(logout())}>
            Cerrar Sesion
          </button>
        </>
      ) : (
        <button type="button" onClick={() => dispatch(loginGoogle())}>
          Autenticarse con Google
        </button>
      )}
    </>
  );
}

export default Login;
