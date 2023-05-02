// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 < 0.9.0;

contract Doit {

    //event definition
    event NewTodo(address user, uint todoId);
    event toDoCompleted(uint todoId, uint256 completed);
    event toDoCancelled(uint todoId, uint256 cancelled);
    event toDoPending(uint todoId, uint256 pending);
    event toDoOngoing(uint todoId, uint256 ongoing);

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

    //TODO: get ongoing todos
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

    //TODO: mark todo as completed
    function completeTodo(uint todoId, uint256 isCompleted) external {
        if(Owner[todoId] == msg.sender){
            todos[todoId].status = isCompleted;
            emit toDoCompleted(todoId, isCompleted);
        }
    }

    //TODO: mark todo as ongoing
    function ongoingTodo(uint todoId, uint256 isOngoing) external {
        if(Owner[todoId] == msg.sender){
            todos[todoId].status = isOngoing;
            emit toDoOngoing(todoId, isOngoing);
        }
    }

    //TODO: mark todo as pending
    function pendingTodo(uint todoId, uint256 isPending) external {
        if(Owner[todoId] == msg.sender){
            todos[todoId].status = isPending;
            emit toDoPending(todoId, isPending);
        }
    }

    //TODO: mark todo as cancelled
    function cancelTodo(uint todoId, uint256 isCancelled) external{
        if(Owner[todoId] == msg.sender){
            todos[todoId].status = isCancelled;
            emit toDoCancelled(todoId, isCancelled);
        }
    }

}