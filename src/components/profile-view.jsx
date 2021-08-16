import React from "react";
import { Row, Col, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getProfile, deleteRegistration, saveProfile, removeFavorite } from '../reducer';
class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: "",
            email: "",
            password: "",
            fullname: "",
            birthdate: "",
            favorites: [],
            favoritesId: -1,
            user: [],
            hasErrors: false,
            errors: [],
            isLoaded: false
        }
    }
    //{"favorites":[],"_id":"60db34ca58195a17f8d54340","password":"2c9341ca4cf3d87b9e4eb905d6a3ec45","fullname":"Ryan Tester","birthday":"1985-03-03T00:00:00.000Z","email":"bob@test.com","__v":0}
    componentDidMount() {

        this.props.getProfile().then((result) => {
            console.log("getProfile=>result: ", result.payload);

            this.setState({
                user: result.payload.user,
                _id: result.payload.user._id,
                email: result.payload.user.email,
                fullname: result.payload.user.fullname,
                birthdate: result.payload.user.birthday,
                favorites: result.payload.user.favorites,
                favoritesId: result.payload.user.favoritesId,
                isLoaded: true
            });

            //alert(result.fullname);
            console.log("STATE:", this.state);
            //window.location.replace("/login");
        });

        // fetch current user;
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
    unRegister = (e) => {
        //  alert(id);
        e.preventDefault();
        this.props.deleteRegistration().then((result) => {
            console.log(result);
            window.location.href = "/login";
        });
    }
    removeFavorites = (id) => {
        alert(id);
        this.props.removeFavorite({ id: id }).then((result) => {
            console.log(result);
        });

    }
    save = (e) => {
        e.preventDefault();
        const body = {
            _id: this.state._id,
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            birthdate: this.state.birthdate,
            favorites: this.state.favoritesId
        };
        alert(JSON.stringify(body));
        console.log("SAVE: ", body)

        this.props.saveProfile({ profile: body }).then((result) => {

            console.log(result);
            //alert(result)
            const response = result.payload.response;
            console.log("response", response);
            if (response.status === -1) {
                this.setState({
                    errors: response.errors,
                    hasErrors: true
                })
            }
            else if (response.status < 0) {
                alert("update failed");
            } else {
                alert(response.message);
            }
        });

    }
    render() {
        if (!this.state.isLoaded) {
            return (<div>loading</div>);
        }
        return (


            <div >
                <Container>
                    <h1>Profile Page</h1>
                    <form onSubmit={this.save}>
                        <Row>
                            <Col>
                                <input type="email" name="email" id="email" required placeholder="email"
                                    value={this.state.email} onChange={this.emailChangeHandler} />
                            </Col>
                        </Row>
                        <br />

                        <Row><Col>
                            <input type="text" name="fullname" id="fullname" minLength="2" required placeholder="fullname"
                                value={this.state.fullname} onChange={this.fullnameChangeHandler} />
                        </Col>
                        </Row>

                        <br />
                        <Row>
                            <Col>
                                <input type="date" name="birthdate" placeholder="birthdate" required
                                    value={this.state.birthdate} onChange={this.birthdateChangeHandler} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <input type="password" name="password" id="password" minlength="8" required placeholder="password"
                                    value={this.state.password} onChange={this.passwordChangeHandler} />
                            </Col>
                        </Row>
                        <br />
                        <Row><Col>
                            <button>Save</button>

                            <button onClick={this.unRegister}>Un Register</button>
                        </Col>

                        </Row>
                    </form>
                    <br />
                    {this.state.favorites.map((movie, idx) => (
                        <div>
                            <Row className="show-grid ">
                                <Col className='w-100'>
                                    {movie.description}
                                </Col>
                            </Row>

                            <Row className='btn-light w-100'>
                                <Col>
                                    <Button className='btn-light btn-sm'
                                        onClick={() => this.removeFavorites(movie.id)}>Remove</Button>
                                </Col>
                            </Row>
                        </div>
                    ))}

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
    return {
        user: state.user
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProfile: id => dispatch(getProfile()),
        deleteRegistration: () => dispatch(deleteRegistration()),
        saveProfile: profile => dispatch(saveProfile(profile)),
        removeFavorite: id => dispatch(saveProfile(id)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileView)
