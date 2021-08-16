import React from "react";
import { connect } from 'react-redux';
import { login } from '../reducer';
import { Container, Row, Col } from 'react-bootstrap';

class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
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
        }
        console.log("auth", body)
        //   alert(JSON.stringify(body));
        this.props.login({ auth: body }).then((result) => {

            const r = result.payload.msg;
            console.log("done", r);
            if (r["token"] === undefined) {
                this.setState({ message: "login failed" });
            } else {
                this.props.setToken(result.token);
                sessionStorage.setItem("token", result.token);
                sessionStorage.setItem("user", result.user);
                window.location.href = "/movies";
            }
        })
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
const mapStateToProps = (state) => {
    //  console.log("mapStateToProps.movies:", state.movies);
    return {
        user: {}
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        login: auth => dispatch(login(auth))
    }

    // console.log("mapDispatchToProps",getMovies);

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView)
