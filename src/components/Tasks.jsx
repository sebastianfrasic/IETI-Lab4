import React from 'react';
import {Task} from './Task';
import {MyDrawer} from "./MyDrawer";
import {NewTask} from './NewTask';

export const Tasks = (props) => {

    return (
        <div>
            <MyDrawer logout={props.logout} userData={props.userData}/>
            {props.items.map((item,i) => {
                return (<Task key={i}
                              description={item.description}
                              responsible={item.responsible}
                              status={item.status}
                              dueDate={item.dueDate}/>
                );
            })}
            <NewTask email={props.userData.username} addTask={props.addTask}/>
        </div>
    );
}
