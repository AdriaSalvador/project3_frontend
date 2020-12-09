import React from 'react'

const CreateUserForm = (props) => {
    const {submitForm, user, changeHandler} = props

    return(
        <div>
            <form onSubmit={submitForm}>

                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    name="username" 
                    value={user.username} 
                    onChange={(event)=>changeHandler(event.target)}
                />

                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    name="password" 
                    value={user.password} 
                    onChange={(event)=>changeHandler(event.target)}
                />

                <button type="submit">Create New User</button>

            </form>
        </div>
    )
}

export default CreateUserForm