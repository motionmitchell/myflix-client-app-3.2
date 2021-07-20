import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            fullname:"",
            birthdate:"",
            favorites:[],
            favoritesId:[],
            user:[]
        }
    }
    //{"favorites":[],"_id":"60db34ca58195a17f8d54340","password":"2c9341ca4cf3d87b9e4eb905d6a3ec45","fullname":"Ryan Tester","birthday":"1985-03-03T00:00:00.000Z","email":"bob@test.com","__v":0}
    componentDidMount(){
        fetch("http://localhost:8080/user")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              user: result,
              email:result.email,
              fullname:result.fullname,
              birthdate:result.birthday,
                favorites:result.favorites,
                favoritesId:result.favoritesId
            });

            //alert(result.fullname);
           console.log (result);
            //window.location.replace("/login");
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
    emailChangeHandler= (e)=>{
       
        this.setState ({email:e.target.value});
    }
    passwordChangeHandler= (e)=>{
       
         this.setState ({password:e.target.value});
    }
    fullnameChangeHandler= (e)=>{
       
        this.setState ({fullname:e.target.value});
    }
    birthdateChangeHandler= (e)=>{
       
        this.setState ({birthdate:e.target.value});
    }
    removeFavorites=(id)=>{
        alert(id);
         fetch ("http://localhost:8080/user/movie/remove/"+id) .then(res => res.json())
         .then((result) => {
 console.log(result.message);
             alert(result.message);
             window.location.reload();
         });
     }
    save = ()=>{
       
        const body = { 
            _id: this.state.user._id,
            email: this.state.email, 
            password: this.state.password ,
            fullname: this.state.fullname,
            birthdate: this.state.birthdate,
            favorites: this.state.favoritesId
        };
        fetch("http://localhost:8080/users/update",
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            //alert(result)
            if (result["email"]==undefined)
            {
                alert("login failed");
            }else {
                alert ("Login successful");
            }
          },
          (error) => {
              alert("error");
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
    }
    render() {
        return (
        <div className="left20px">	

            <h1>Register Page</h1>

            <p><input type="text" name="email" id="email" placeholder="email"
                value={this.state.email} onChange={this.emailChangeHandler}/></p>
               
              <p> <input type="text" name="fullname" id="fullname" placeholder="fullname"
                    value={this.state.fullname} onChange={this.fullnameChangeHandler}/>
                </p>
              	<p><input type="text" name="birthdate" placeholder="birthdate"
                  value={this.state.birthdate} onChange={this.birthdateChangeHandler}/>
                </p>
                <p><input type="text" name="password" id="password" placeholder="password"
                 value={this.state.password} onChange={this.passwordChangeHandler}/>
                </p>
           
                <p><button onClick={this.save}>Save</button></p>
            <div id='divUserFavorites'>
                <br/>
                {this.state.favorites.map ((movie, idx)=>(
                     <Row className="show-grid ">
                         <Col className='w-100'>
                    {movie.description}
                    </Col>
                    <Col className='btn-light w-100'><Button className='btn-light btn-sm'
                 onClick={()=>this.removeFavorites(movie.id)}>Remove</Button>
                </Col> 
                    
                    </Row>
                ))}
            </div>
        </div>
        );
    }

}
export default ProfileView;