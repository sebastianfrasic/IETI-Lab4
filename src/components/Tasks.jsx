import React from 'react';
import {Task} from './Task';
import {MyDrawer} from "./MyDrawer";

export const Tasks = (props) => {

    return (
        <div>
            <MyDrawer logout={props.logout} email={props.email}/>
            {props.items.map((item,i) => {
                return (<Task key={i}
                              description={item.description}
                              responsible={item.responsible}
                              status={item.status}
                              dueDate={item.dueDate}/>
                );
            })}
        </div>
    );
}
