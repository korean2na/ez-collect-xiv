import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider"

export default function LoginView() {
    const { login } = useContext(AuthContext)

    return (
        <div id="LoginView">
            <div className="row justify-content-center gap-5">
                <div className="text-center text-light pt-5">
                    <h1><strong>Welcome to Eorzea Collect XIV</strong></h1>
                    <br />
                    <h3>Please login using your Google account to continue</h3>
                </div>
            
                <button onClick={login} className="col-1 btn btn-warning fs-4 py-3"><strong>Login</strong></button>
            </div>
        </div>
    )
}