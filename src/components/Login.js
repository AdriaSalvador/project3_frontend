import React from 'react'
import '../styles/Login.css'

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends React.Component {

    render() {

        return (

            <div className="login">

                <div className="login-container">

                    <h2>Log In</h2>

                    <Form onSubmit={this.props.submitLogin}>

                        <FormGroup className="mb-2 mb-sm-4">
                            <Label htmlFor="username" className="mb-2">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                value={this.props.loggingUser.username}
                                onChange={(event) => this.props.changeHandlerLogin(event.target)}
                                placeholder="Enter your Username or Email" />
                        </FormGroup>

                        <FormGroup className="mb-2 mb-sm-4">
                            <Label for="examplePassword" className="mb-2">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                value={this.props.loggingUser.password}
                                onChange={(event) => this.props.changeHandlerLogin(event.target)}
                                placeholder="Must have at least 7 characters" />
                        </FormGroup>

                        <Button type="submit">Log In</Button>

                    </Form>
                </div>
            </div>
        )
    }

}

export default Login