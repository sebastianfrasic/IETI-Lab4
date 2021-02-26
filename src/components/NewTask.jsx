import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PostAddTwoToneIcon from '@material-ui/icons/PostAddTwoTone';
import Fab from '@material-ui/core/Fab';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';




const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3),
        },
    }
}));

export const NewTask = (props) => {


    const [openState, setOpenState] = useState(false);
    const [descriptionState, setDescriptionState] = useState("");
    const [responsibleState, setResponsibleState] = useState("");
    const [statusState, setStatusState] = useState("");
    const [dueDateState, setDueDateState] = useState(null);

    const handleOpenDialog = () => {
        setOpenState(true);
    };

    const handleCloseDialog = () => {
        setOpenState(false);
    };

    const handleDescriptionChange = (e) => {
        setDescriptionState(e.target.value);
    }

    const handleResponsibleChange = (e) => {
        setResponsibleState(e.target.value);
    }

    const handleStatusChange = (e) => {
        setStatusState(e.target.value);
    }

    const handleDueDateChange = (date) => {
        setDueDateState(date.getTime());
    }

    const handleAdd = (e) => {
        e.preventDefault();
        if (dueDateState === null || descriptionState === "" || statusState === "" || responsibleState === "") {
            alert("Some fields are incomplete.");
        } else {
            const newTask = {
                "description": descriptionState,
                "responsible": {
                    "name": responsibleState,
                    "email": props.email
                },
                "status": statusState,
                "dueDate": dueDateState
            };
            props.addTask(newTask);
            setOpenState(false);
        }
    }

    return (
        <div>
            <div style={{ textAlign: "left", padding: "15px" }}>
                <Fab color="primary" aria-label="add" onClick={handleOpenDialog}>
                    <PostAddTwoToneIcon />
                </Fab>
            </div>
            <Dialog open={openState} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title" disableTypography>
                    <Typography variant="h4" style={{ textAlign: "center" }}>New Task</Typography>
                </DialogTitle>
                <DialogContent>
                    <form className="form">
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input
                                onChange={handleDescriptionChange}
                                id="description"
                                name="description"
                                autoComplete="description"
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="responsible">Responsible</InputLabel>
                            <Input
                                onChange={handleResponsibleChange}
                                id="responsible"
                                name="responsible"
                                autoComplete="responsible"
                                autoFocus
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="status">Status</InputLabel>
                            <Select
                                labelId="status"
                                id="status"
                                value={statusState}
                                onChange={handleStatusChange}
                            >
                                <MenuItem value={"Ready"}>Ready</MenuItem>
                                <MenuItem value={"In progress"}>In progress</MenuItem>
                                <MenuItem value={"Done"}>Done</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <LocalizationProvider required dateAdapter={AdapterDateFns}>
                                <DatePicker required
                                    label="Due date"
                                    value={dueDateState}
                                    onChange={handleDueDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>

                    <Fab style={{ backgroundColor: "green" }} aria-label="Cancel" onClick={handleAdd}>
                        <CheckRoundedIcon />
                    </Fab>
                </DialogActions>
            </Dialog>
        </div>


    );
}
