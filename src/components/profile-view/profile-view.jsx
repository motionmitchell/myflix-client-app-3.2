import React from "react";
import { Row, Col, Button, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import './profile-view.css';
//import { getProfile, deleteRegistration, saveProfile, removeFavorite } from '../reducer';
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
            isLoaded: false,
            message: ""
        }
    }
    //{"favorites":[],"_id":"60db34ca58195a17f8d54340","password":"2c9341ca4cf3d87b9e4eb905d6a3ec45","fullname":"Ryan Tester","birthday":"1985-03-03T00:00:00.000Z","email":"bob@test.com","__v":0}
    componentDidMount() {
        //alert(this.props.server);
        axios.get(this.props.server + 'user', {

        })
            .then(response => {
                //   alert("getUser");
                console.log("getUser1", response.data);
                // #4
                this.setState({ user: response.data });
                //   console.log("getProfile=>result: ", result.payload);
                const user = response.data;
                this.setState({
                    user: user,
                    _id: user._id,
                    email: user.email,
                    fullname: user.fullname,
                    birthdate: user.birthday,
                    favorites: user.favorites,
                    favoritesId: user.favoritesId,
                    isLoaded: true
                });
                // this.props.setMovies(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });


        //alert(result.fullname);
        console.log("STATE:", this.state);
        //window.location.replace("/login");


        // fetch current user;
    }
    setMessage = (msg) => {
        this.setState({ message: msg });
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
        axios.get(this.props.server + 'user/unreg', {

        })
            .then(response => {
                sessionStorage.removeItem("token");
                window.location.href = "/login";
            });
    }
    removeFavorites = async (id) => {
        //  alert(id);
        const setMessage = this.setMessage;
        const resp = await axios.get(this.props.server + 'user/movie/remove/' + id);
        const fav = this.state.favorites.filter((f) => { return f.id !== id; });
        console.log("FAV", fav);
        this.setState({ favorites: fav });
        console.log(resp);
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
        //  alert(JSON.stringify(body));
        console.log("SAVE: ", body)
        fetch(this.props.server + 'users/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (res) { return res.json(); })
            .then(function (response) {
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
                // }

            })


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
                                <Col xs="auto" >
                                    <Button className='btn btn-light'
                                        onClick={() => this.removeFavorites(movie.id)}>Remove</Button>
                                </Col>
                                <Col className={idx % 2 === 0 ? "xs evenRow" : "xs oddRow"}>

                                    {movie.description}
                                </Col>
                                <hr />

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

export default connect(
    mapStateToProps,
    //  mapDispatchToProps
)(ProfileView)
