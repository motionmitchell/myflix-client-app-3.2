import React from "react";
class LoginView extends React.Component {
    constructor(props) {
        super(props);
        console.log ("constructor", props)
        this.state = {
            email:"",
            password:""
        }
    }
    componentDidMount (){
        fetch(this.props.server+"user/logout");
        sessionStorage.removeItem("token");
       
        this.props.setToken(null);
    }
    componentWillReceiveProps(props) {
        console.log ("componentWillReceiveProps",props )
      }
    emailChangeHandler= (e)=>{
       // alert(e.target.value);
        this.setState ({email:e.target.value});
    }
    passwordChangeHandler= (e)=>{
        // alert(e.target.value);
         this.setState ({password:e.target.value});
     }
    login = ()=>{
        const email = this.state.email;
        const pwd = this.state.password;
      //  alert(email+"/"+pwd);
    }
    
    auth = ()=>{
        const body = { 
            email: this.state.email, 
            password: this.state.password 
        };
      //  alert(this.props.server);
        fetch(this.props.server+"users/login",
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            //alert(result)
            if (result["token"]==undefined)
            {
                alert("login failed");
            }else {
                this.props.setToken (result.token);
                sessionStorage.setItem("token", result.token);
                sessionStorage.setItem("user", result.user);
                alert ("Login successful");
               // this.props.history.push('/movies')
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
            
        <h1>Login Page</h1>
    
       
        <p><input type="text" name="email" id="email" value={this.email} onChange={this.emailChangeHandler}/>
        </p>
                <p><input type="text" name="password" id="password" placeholder='password' 
                 value={this.password} onChange={this.passwordChangeHandler}/> 
                   </p>
                   <br/>
            <button onClick={this.auth}>Login</button>

            
        </div>
        );
    }

}
export default LoginView;