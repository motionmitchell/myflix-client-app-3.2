import React from "react";
class RegistrationView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:"",
            fullname:"",
            birthdate:""
        }
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
    register = ()=>{
       
        const body = { 
            email: this.state.email, 
            password: this.state.password ,
            fullname: this.state.fullname,
            birthdate: this.state.birthdate
        };
        fetch(this.props.server+"users/register",
        {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
            alert(result.message)
            
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
                value={this.email} onChange={this.emailChangeHandler}/></p>
               
              <p> <input type="text" name="fullname" placeholder="fullname"
                    value={this.fullname} onChange={this.fullnameChangeHandler}/>
                </p>
              	<p><input type="text" name="birthdate" placeholder="birthdate"
                  value={this.birthdate} onChange={this.birthdateChangeHandler}/>
                </p>
                <p><input type="text" name="password" id="password" placeholder="password"
                 value={this.password} onChange={this.passwordChangeHandler}/>
                </p>
           
                <p><button onClick={this.register}>Register</button></p>
                  
           

            
        </div>
        );
    }

}
export default RegistrationView;