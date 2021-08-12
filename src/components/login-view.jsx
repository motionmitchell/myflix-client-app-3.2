import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
class LoginView extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructor", props)
        this.state = {
            email: "",
            password: "",
            message: ""
        }
    }
    componentDidMount() {
        console.log("log in");
        fetch(this.props.server + "user/logout");
        sessionStorage.removeItem("token");

        this.props.setToken(null);
    }
    componentWillReceiveProps(props) {
        console.log("componentWillReceiveProps", props)
    }
    emailChangeHandler = (e) => {

        this.setState({ email: e.target.value });
    }
    passwordChangeHandler = (e) => {

        this.setState({ password: e.target.value });
    }

    auth = (e) => {
        e.preventDefault();
        const body = {
            email: this.state.email,
            password: this.state.password
        };

        fetch(this.props.server + "users/login",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then((result) => {
                console.log(result);

                if (result["token"] === undefined) {
                    this.setState({ message: "login failed" });
                } else {
                    this.props.setToken(result.token);
                    sessionStorage.setItem("token", result.token);
                    sessionStorage.setItem("user", result.user);


                }
            },
                (error) => {

                    this.setState({
                        isLoaded: true,
                        message: "login failed"
                    });
                }
            );
    }
    render() {
        return (
            <div>
                <Container>
                    <form onSubmit={this.auth}>
                        <h1>Login Page</h1>
                        <Row><Col>Email:<br /><input type="email" name="email" id="email" required placeholder='email'
                            value={this.email} onChange={this.emailChangeHandler} />
                        </Col></Row>

                        <Row><Col>Password:<br /><input type="password" name="password" id="password" minLength="8" required placeholder='password'
                            value={this.password} onChange={this.passwordChangeHandler} />
                        </Col></Row>
                        <br />
                        <button>Login</button>
                        <br />
                    </form>
                    <div>{this.state.message}</div>
                </Container>
            </div>
        );
    }

}
export default LoginView;