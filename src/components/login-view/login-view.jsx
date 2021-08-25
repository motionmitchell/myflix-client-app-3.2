import React from "react";
import { connect } from 'react-redux';
//import { login } from '../reducer';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
class LoginView extends React.Component {
    constructor(props) {
        super(props);
        console.log("login.props", props)
        this.state = {
            email: "",
            password: "",
            user: null,
            setToken: this.props.setToken,
            message: ""
        }

    }
    setMessage = (msg) => {
        this.setState({ message: msg });
    }
    componentDidMount() {
        console.log("log in");
        //   fetch(this.props.server + "user/logout");
        sessionStorage.removeItem("token");

        this.props.setToken(null);
    }
    emailChangeHandler = (e) => {
        // alert(e.target.value);
        this.setState({ email: e.target.value });
    }
    passwordChangeHandler = (e) => {
        // alert(e.target.value);
        this.setState({ password: e.target.value });
    }

    auth = (e) => {
        e.preventDefault();
        const body = {
            email: this.state.email,
            password: this.state.password,
            message: ""
        };
        console.log("auth", body);
        const setToken = this.props.setToken;
        const setMessage = this.setMessage;
        axios.post(this.props.server + 'users/login', body)
            .then(function (resp) {
                //alert(JSON.stringify(data))
                // if (resp.ok) {
                const msg = resp.data;//await resp.json();

                console.log("RES", msg);
                if (msg.hasOwnProperty("token")) {
                    console.log("Login Ok!");
                    setToken(msg.token);
                    window.location.replace("/movies");
                } else {
                    console.log("Login failed!!");
                    setMessage("Login Failed");
                }

                return { msg };
                // }

            });



    }
    /*
        auth2 = (e) => {
            e.preventDefault();
            const body = {
                email: this.state.email,
                password: this.state.password,
                message: ""
            }
            console.log("auth", body)
            //   alert(JSON.stringify(body));
            alert(this.props.server)
            axios.post(this.props.server + 'users/login', {
                body
    
            })
                .then(response => {
                    alert("auth");
                    console.log("auth", response.data);
                    // #4
                    const msg = response.data;// await resp.json();
                    console.log("RES", msg);
                    if (msg.hasOwnProperty("token"))
                        console.log("Login Ok!");
                    else
                        console.log("Login failed!!");
                    return { msg };
                    //this.props.setMovies(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
    
    
        }
        */
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
const mapStateToProps = (state) => {
    //  console.log("mapStateToProps.movies:", state.movies);
    return {
        user: {}
    }
}

export default connect(
    mapStateToProps,
    //  mapDispatchToProps
)(LoginView)
