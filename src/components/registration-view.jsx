import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullname: "",
            birthdate: "",
            errors: [],
            hasErrors: false,
            message: ""
        }
    }
    emailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }
    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }
    fullnameChangeHandler = (e) => {
        this.setState({ fullname: e.target.value });
    }
    birthdateChangeHandler = (e) => {
        this.setState({ birthdate: e.target.value });
    }
    register = () => {
        const body = {
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            birthdate: this.state.birthdate
        };
        fetch(this.props.server + "users/register",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                if (result.status === -1) {
                    this.setState({
                        errors: result.errors,
                        hasErrors: true
                    })
                } else if (result.status === -2) {
                    this.setState({ message: result.message });
                } else {
                    this.setState({ message: result.message });
                    window.location.href = "/login";
                }
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        message: "error with registration"
                    });
                }
            );
    }
    render() {
        return (
            <div >
                <Container>
                    <h1>Register Page</h1>
                    <Row>
                        <Col>Email:<br /><input type="text" name="email" id="email" placeholder="email"
                            value={this.email} onChange={this.emailChangeHandler} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>Full name:<br />
                            <input type="text" name="fullname" placeholder="fullname"
                                value={this.fullname} onChange={this.fullnameChangeHandler} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>Birthdate:<br />
                            <input type="date" name="birthdate" placeholder="birthdate (CCYY-MM-DD)"
                                value={this.birthdate} onChange={this.birthdateChangeHandler} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>Password:<br />
                            <input type="password" name="password" id="password" placeholder="password"
                                value={this.password} onChange={this.passwordChangeHandler} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <button onClick={this.register}>Register</button>
                        </Col>
                    </Row>
                    <hr />
                    {this.state.hasErrors ?
                        this.state.errors.map((error) => (
                            <p>{error.field} : {error.message}</p>
                        )) : <div />
                    }
                </Container>
                <div>{this.state.message}</div>
            </div>
        );
    }
}
export default RegistrationView;