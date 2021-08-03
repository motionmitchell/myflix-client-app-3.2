import React from "react";
class LoginView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""
        }
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
        alert(email+"/"+pwd);
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