import {ListTasks} from './taskList'

/**
 * @jest-environment jsdom
 */

document.body.innerHTML = `
<div class="item"> 
    <input class="add-item" id="new-item" type="text" placeholder="Add to your list">
    <div type ="button" id="add-event"> <i class="fa-solid fa-arrow-turn-down" ></i>  </div>
</div>       
<ul class="list">    
</ul>
<input class="clear-all" id="clearAll" type="button" value="Clear all completed"> 
`

const taskList = new ListTasks([]);


describe( 'Testing TaskList', () => {
    let retDataTemp = [];
    test( 'Create task list Id should be -1 by design', ()=>{
        expect(taskList.id).toBe(-1);
    });

    
    test( 'Add a new element ', ()=>{
        const newItem=document.querySelector('#new-item');
        newItem.value = 'Hello-0';
        taskList.addTask();
        expect(taskList.id).toBe(0);
        expect(taskList.taskListArr[0].index).toBe(0);
        expect(taskList.taskListArr[0].description).toBe('Hello-0');
        expect(taskList.taskListArr[0].completed).toBe(false);
        let liNum = document.querySelector('.list').getElementsByTagName("li").length;
        expect(liNum).toBe(1);

        newItem.value = 'Hello-1';
        taskList.addTask();
        expect(taskList.id).toBe(1);
        expect(taskList.taskListArr[1].index).toBe(1);
        expect(taskList.taskListArr[1].description).toBe('Hello-1');
        expect(taskList.taskListArr[1].completed).toBe(false);
        liNum = document.querySelector('.list').getElementsByTagName("li").length;
        expect(liNum).toBe(2);
        retDataTemp = JSON.parse(localStorage.taksListStorage);
        expect(retDataTemp[0].description).toBe('Hello-0');
        expect(retDataTemp[1].description).toBe('Hello-1');
        console.log(retDataTemp);
    });

    test( 'Delete a new element ', ()=>{
        const itemId = 'item-0'
        taskList.trash(itemId);

        expect(taskList.id).toBe(0);
        expect(taskList.taskListArr[0].index).toBe(0);
        expect(taskList.taskListArr[0].description).toBe('Hello-1');
        expect(taskList.taskListArr[0].completed).toBe(false);
        let liNum = document.querySelector('.list').getElementsByTagName("li").length;
        expect(liNum).toBe(1);
        retDataTemp = JSON.parse(localStorage.taksListStorage);
        expect(retDataTemp[0].description).toBe('Hello-1');
    });


    test( 'Edit an element ', ()=>{

        const newLabel=document.querySelector('#label-0');
        newLabel.value = 'new_label';

        const itemId = 'item-0'
        taskList.edit(itemId);
        
        expect(taskList.taskListArr[0].index).toBe(0);
        expect(taskList.taskListArr[0].description).toBe('new_label');
                
        retDataTemp = JSON.parse(localStorage.taksListStorage);
        expect(retDataTemp[0].description).toBe('new_label');
    });

    test( 'Completed status ', ()=>{

        const checkItem = document.querySelector(`#check-0`);
        checkItem.checked= true;
        const checkId = 'check-0';
        taskList.editLabel(checkId);

        expect(taskList.taskListArr[0].completed).toBe(true);

        retDataTemp = JSON.parse(localStorage.taksListStorage);
        expect(retDataTemp[0].completed).toBe(true);
           
    });

    test ( ' Clear all ' , () => {

        taskList.clearAll();
        let liNum = document.querySelector('.list').getElementsByTagName("li").length;
        expect(liNum).toBe(0);

    });
    
    

 }
 
)