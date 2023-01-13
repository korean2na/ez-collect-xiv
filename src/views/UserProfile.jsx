import { useContext } from "react"
import { AuthContext } from "../contexts/AuthProvider"

export default function UserProfile() {
    const { user } = useContext(AuthContext)

    return (
        <div id="UserProfile" className="text-center">
            <h1 className="text-light my-4"><strong>User Profile</strong></h1>
            <div className="row justify-content-center">
                <div className="col-6 card py-4 shadow-lg rounded">
                    <p>Name: &nbsp; { user.displayName }</p>
                    <p>Email: &nbsp; { user.email }</p>
                    <p>ID: &nbsp; { user.uid }</p>
                </div>
            </div>
        </div>
    )
}