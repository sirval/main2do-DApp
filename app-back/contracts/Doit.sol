// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 < 0.9.0;

contract Doit {

    //event definition
    event NewTodo(address user, uint todoId);
    event changeTodoStatus(uint todoId, uint256 status);

    //structure definition
    struct ToDo{
        uint id;
        string title;
        string description;
        string todoTime;
        uint256 priority;
        uint256 status;
    }

    ToDo[] private todos;
    mapping(uint256 => address) Owner;

    //TODO: Create new task
    function newTodo(
        string memory title,
        string memory description,
        string memory todoTime,
        uint256  priority, //[1 high, 2 meduim, 3 low]
        uint256 status // 1=ongoing, 2=completed, 3=pending, 4=cancelled
       
        ) external {

            uint todoId = todos.length;
            todos.push(ToDo(todoId, title, description, todoTime, priority, status));
            Owner[todoId] = msg.sender;
            emit NewTodo(msg.sender, todoId);
    }

    //TODO: get todos by status
    function getTodosByStatus(uint256 status) external view returns (ToDo[] memory){
        //define a temporary array to hold ongoing todos
        ToDo[] memory temp_array = new ToDo[](todos.length);
        uint counter = 0;
        for (uint i = 0; i < todos.length; i++) {
            if(
                (Owner[i] == msg.sender && todos[i].status == status )
            ){
                temp_array[counter] = todos[i];
                counter++;
            }
        }

        ToDo[] memory result = new ToDo[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temp_array[i];
        }
        return result;
    }

    //TODO: get all todos
    function getTodos() external view returns (ToDo[] memory){
        ToDo[] memory temp_array = new ToDo[](todos.length);
        uint counter = 0;
        for (uint256 i = 0; i < todos.length; i++) {
            if(Owner[i] == msg.sender){
                temp_array[counter] = todos[i];
                counter++;
            }
        }
        ToDo[] memory result = new ToDo[](counter);
        for (uint i = 0; i < counter; i++) {
            result[i] = temp_array[i];
        }
        return result;
    }

    //TODO: update todo status
    function updateTodoStatus(uint _todoId, uint256 _status) external {
        if(Owner[_todoId] == msg.sender){
            todos[_todoId].status = _status;
            emit changeTodoStatus(_todoId, _status);
        }
    }

}