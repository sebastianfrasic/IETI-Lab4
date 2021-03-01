import React, { useState } from 'react';
import {Task} from './Task';
import {MyDrawer} from "./MyDrawer";
import {NewTask} from './NewTask';

export const Tasks = (props) => {

    const[filtersState,setFiltersState] = useState({
        dueDate:null,
        status:"",
        responsible:""
    });

    const handleFilters = (filters) => {
        setFiltersState(filters);
    };

    let taskList = props.items;

    if(filtersState.dueDate !== null){
        taskList = taskList.filter(item => item.dueDate === filtersState.dueDate);
    }
    if(filtersState.status !== ""){
        taskList = taskList.filter(item => item.status === filtersState.status);
    }
    if(filtersState.responsible !== ""){
        taskList = taskList.filter(item => item.responsible === filtersState.responsible);
    }


    return (
        <div>
            <MyDrawer logout={props.logout} userData={props.userData}  applyFilters={handleFilters}/>
            {taskList.map((item,i) => {
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
