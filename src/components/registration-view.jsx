import React from "react";
import { connect } from 'react-redux';
import { register } from '../reducer';
import { Container, Row, Col } from 'react-bootstrap';
class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullname: "",
            birthdate: ""
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
    register = (e) => {
        e.preventDefault();
        const body = {
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            birthdate: this.state.birthdate
        };

        this.props.register({ reg: body }).then((resp) => {
            const result = resp.payload.msg;
            console.log("result", result);
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
        })
    }
    render() {
        return (
            <div >
                <Container>
                    <h1>Register Page</h1>
                    <form onSubmit={this.register}>
                        <Row>
                            <Col>Email: <br /><input type="email" name="email" id="email" required placeholder="email"
                                value={this.email} onChange={this.emailChangeHandler} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>Full name: <br />
                                <input type="text" name="fullname" required minLength="2" placeholder="fullname"
                                    value={this.fullname} onChange={this.fullnameChangeHandler} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>Birthdate: <br />
                                <input type="date" name="birthdate" required placeholder="birthdate (CCYY-MM-DD)"
                                    value={this.birthdate} onChange={this.birthdateChangeHandler} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>Password: <br />
                                <input type="password" name="password" id="password" required minLength="8" placeholder="password"
                                    value={this.password} onChange={this.passwordChangeHandler} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <button>Register</button>
                            </Col>
                        </Row>
                    </form>
                    <hr />

                    {this.state.hasErrors ?
                        this.state.errors.map((error) => (
                            <p>{error.field}: {error.message}</p>
                        )) : <div />
                    }

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
        register: contact => dispatch(register(contact))
    }

    // console.log("mapDispatchToProps",getMovies);

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationView)
