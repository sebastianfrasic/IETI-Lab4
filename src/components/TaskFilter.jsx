import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export const TaskFilter = (props) => {

    const classes = useStyles();

    const [dueDateState, setDueDateState] = useState(null);
    const [statusState, setStatusState] = useState("");
    const [responsibleState, setResponsibleState] = useState("");

    const handleDueDateChange = (date) => {
        setDueDateState(date);
    };

    const handleStatusChange = (e) => {
        setStatusState(e.target.value);
    };

    const handleResponsibleChange = (e) => {
        setResponsibleState(e.target.value);
    };

    const handleCleanFilters = () => {
        setDueDateState(null);
        setResponsibleState("");
        setStatusState("");
    };

    const handleSaveFilters = (e) => {
        e.preventDefault();
        const filters = {
            dueDate: dueDateState,
            status: statusState,
            responsible: responsibleState
        };
        props.applyFilters(filters);
        props.closeAction();
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                onClose={props.closeAction}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <div className={classes.paper}>
                        <Typography variant="h3" align="center" >TASK FILTERS</Typography>
                        <form className="form">
                            <FormControl margin="normal" required fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Due date"
                                        onChange={handleDueDateChange}
                                        value={dueDateState}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
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
                                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                    <MenuItem value={"Done"}>Done</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                        <br/>
                        <br/>
                        <Button
                            onClick={handleSaveFilters}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                        >Apply</Button>
                        <br></br>
                        <br></br>
                        <Button
                            onClick={handleCleanFilters}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Clear all</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}