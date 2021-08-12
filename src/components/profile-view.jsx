import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            fullname: "",
            birthdate: "",
            favorites: [],
            favoritesId: [],
            user: [],
            message: "",
            hasErrors: false,
            errors: []
        }
    }
    componentDidMount() {
        fetch(this.props.server + "user")
            .then(res => res.json())
            .then(
                (result) => {

                    if (result["_id"] === undefined) // no user logged in redirect to login page.
                    {
                        window.location.href = "/login";
                    }
                    this.setState({
                        user: result,
                        email: result.email,
                        fullname: result.fullname,
                        birthdate: result.birthday,
                        favorites: result.favorites,
                        favoritesId: result.favoritesId
                    });

                    console.log(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("error");
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

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
    removeFavorites = (id) => {
        alert(id); ///user/movie/remove/:id
        fetch(this.props.server + "user/movie/remove/" + id).then(res => res.json())
            .then((result) => {
                console.log(result.message);
                alert(result.message);
                window.location.reload();
            });
    }
    unRegister = (e) => {
        //  alert(id);
        e.preventDefault();
        fetch(this.props.server + "user/unreg/1").then(res => res.json())
            .then((result) => {
                console.log(result.message);
                alert(result.message);
                window.location.href = "/login";
            });
    }
    save = (e) => {
        e.preventDefault();
        const body = {
            _id: this.state.user._id,
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            birthdate: this.state.birthdate,
            favorites: this.state.favoritesId
        };
        fetch(this.props.server + "users/update",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                //alert(result)
                if (result.status === -1) {
                    this.setState({
                        errors: result.errors,
                        hasErrors: true
                    })
                }
                else if (result.status < 0) {
                    alert("update failed");
                } else {
                    alert(result.message);
                }
            },
                (error) => {
                    this.setState({ message: "error loading profile" });
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }
    render() {
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
                            <input type="text" name="fullname" id="fullname" minlength="2" required placeholder="fullname"
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

            </div >
        );
    }

}
export default ProfileView;