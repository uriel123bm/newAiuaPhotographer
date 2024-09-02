import React from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./ApiRequests";

class Wrapper extends React.Component {
    state = {
        responseFromGetRequest: "",
        responseFromPostRequest: "",
        username: "",
        errorMessage: ""
    };

    componentDidMount() {
        sendApiPostRequest("http://localhost:8989/sign-in", {
            username: "shai@s111hai",
            password: "123456781"
        }, (response) => {
            if (response.data.success) {
                this.setState({
                    username: response.data.user.username
                })
            } else {
                if (response.data.errorCode == 1) {
                    this.setState({
                        errorMessage: "No Such User"
                    })
                } else if (response.data.errorCode == 2) {
                    this.setState({
                        errorMessage: "Password Incorrent"
                    })

                }
            }
        })
    }


    render () {
        return (
            <div>
                <table>
                    <tr>
                        <td>
                            <input placeholder={"Enter your username"}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input placeholder={"Enter your password"}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button >Sign In</button>
                        </td>
                    </tr>
                </table>
                {
                    this.state.username.length > 0 &&
                    <div>
                        Hello: {this.state.username}
                    </div>
                }
                {
                    this.state.errorMessage
                }

            </div>
        )
    }
}

export default Wrapper;