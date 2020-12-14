import React from 'react'
import '../styles/Signup.css'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Signup = (props) => {
    const { submitSignup, newUser, changeHandlerSignup } = props

    return (
        <div className="signup">

            
       
            <div className="signup-container">
                
                <h2>Sign Up</h2>

                <Form onSubmit={submitSignup}>

                    <FormGroup className="mb-2 mb-sm-4">
                        <Label htmlFor="username" className="mb-2">Username</Label>
                        <Input 
                            type="text" 
                            name="username" 
                            value={newUser.username} 
                            onChange={(event)=>changeHandlerSignup(event.target)} 
                            placeholder="Enter your Username or Email" />
                    </FormGroup>
                    
                    <FormGroup className="mb-2 mb-sm-4">
                        <Label for="examplePassword" className="mb-2">Password</Label>
                        <Input 
                            type="password" 
                            name="password" 
                            value={newUser.password} 
                            onChange={(event)=>changeHandlerSignup(event.target)} 
                            placeholder="Must have at least 7 characters" />
                    </FormGroup>

                        <Button type="submit">Create User</Button>

                </Form> 
            </div>
        </div>
    )
}

export default Signup