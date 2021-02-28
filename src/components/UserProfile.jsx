import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export const UserProfile = (props) => {

    const [fullNameState, setFullNameState] = useState(props.userData.fullName);
    const [passwordState, setPasswordState] = useState("");
    const [repasswordState, setRepasswordState] = useState("");


    const handleFullNameChange = (e) => {
        setFullNameState(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPasswordState(e.target.value);
    };

    const handleRePasswordChange = (e) => {
        setRepasswordState(e.target.value);
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if (passwordState !== repasswordState ) {
            alert("The passwords doesn´t match");
        } else if(passwordState !== props.userData.password){
            alert("Incorrect password");
        }
        else {
            props.updateUserData(fullNameState, passwordState);
            alert("Data updated!");
        }
    };

    return (
        <div>
            <CssBaseline />
            <main className="layout">
                <Paper className="paper">
                    <Typography variant="h4">Registration</Typography>
                    <AccountCircleIcon style={{ fontSize: 80 }} />
                    <form className="form" onSubmit={handleUpdateProfile}>
                        <FormControl margin="normal" fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input
                                disabled                        
                                id="email"
                                name="email"
                                autoComplete="email"
                                value={props.userData.email}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="fullName">Full name</InputLabel>
                            <Input
                                onChange={handleFullNameChange}
                                id="fullName"
                                name="fullName"
                                autoComplete="fullName"
                                value={fullNameState}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                type="password"
                                onChange={handlePasswordChange}
                                id="password"
                                name="password"
                                autoComplete="password"
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="rePassword">Confirm password</InputLabel>
                            <Input
                                onChange={handleRePasswordChange}
                                type="password"
                                id="rePassword"
                                name="rePassword"
                                autoComplete="rePassword"
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                            >Save
                            </Button>
                        </FormControl>
                    </form>
                </Paper>
            </main>
        </div>
    );
};