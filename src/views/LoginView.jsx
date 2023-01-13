import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider"

export default function LoginView() {
    const { googleLogin } = useContext(AuthContext)

    return (
        <div id="LoginView">
            <div className="text-center text-light">
                <div className="row justify-content-center gap-5">
                    <div className="pt-5 px-0">
                        <h1><strong>Welcome to Eorzea Collect XIV!</strong></h1>
                        <p>A place to keep track of your collections in Final Fantasy XIV as you adventure through Eorzea.</p>
                        <br />
                        <h3>Please login using your Google account to continue</h3>
                    </div>
                
                    <button onClick={googleLogin} className="col-2 btn btn-warning fs-4 py-3 mt-5 mb-3"><strong>Login</strong></button>
                </div>
                <div className="row justify-content-center fs-5 mt-5 pt-5 pb-3">
                    <p className="px-0">Powered by <a href="https://ffxivcollect.com/" target="_blank"><strong>FFXIV Collect</strong></a> and <a href="https://xivapi.com/" target="_blank"><strong>xivapi</strong></a></p>
                </div>
                <div className="row justify-content-center">
                    <p className="px-0">FINAL FANTASY is a registered trademark of Square Enix Holdings Co., Ltd.</p>
                    <p className="px-0">FINAL FANTASY XIV © SQUARE ENIX CO., LTD.</p>
                </div>
            </div>
        </div>
    )
}