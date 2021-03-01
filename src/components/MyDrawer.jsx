import React, { useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import './MyDrawer.css';
import Typography from '@material-ui/core/Typography';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { TaskFilter } from './TaskFilter';

export const MyDrawer = (props) => {

    const [state, setState] = React.useState({
        left: false
    });

    const [openModalState, setOpenModalState] = useState(false);

    const handleOpenModal = () => {
        setOpenModalState(true);
    };

    const handleCloseModal = () => {
        setOpenModalState(false);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleUserProfileView = () => {
        window.location.href = "/registration";
    };

    const list = (anchor) => (
        <div
            className="list"
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <PersonOutlineTwoToneIcon style={{ fontSize: 50 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={props.userData.username}
                        secondary={
                            <div>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="textPrimary"
                                >{props.userData.email}
                                </Typography>
                            </div>
                        } />

                </ListItem>
                <List>
                    <ListItem onClick={handleUserProfileView} button>
                        <ListItemIcon>
                            <EditTwoToneIcon style={{ fontSize: 50 }} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Edit profile"
                        />
                    </ListItem>
                </List>
            </List>


            <Divider />
            <List>
                <ListItem className="exit" onClick={props.logout} button>
                    <ListItemIcon>
                        <ExitToAppTwoToneIcon style={{ fontSize: 50 }} />
                    </ListItemIcon>
                    <ListItemText
                        primary="Log Out"
                    />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            <div>
                <Button onClick={toggleDrawer("left", true)}>Menu</Button>
                <Button onClick={handleOpenModal}>
                    Filters
                </Button>
                <TaskFilter open={openModalState} closeAction={handleCloseModal} applyFilters={props.applyFilters} />
            </div>
            <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
                {list("left")}
            </Drawer>
        </div>
    );
}
