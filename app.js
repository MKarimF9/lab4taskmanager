const addTaskButton = document.getElementById('add-task');
const myUnTaskList = document.getElementById("my-task-list");
let myList = [];
const filterList = document.getElementById('filter');


//function to add task to the screen and to the array

function addTask() {
    const task = {
        nameInput: document.getElementById("name").value,
        categoryInput: document.getElementById("category").value,
        deadlineInput: document.getElementById("deadline").value,
        statusInput: document.getElementById("status").value
    }
    if(task.nameInput === ''){
        alert('enter valid input')
        return;
    }
    myList.push(task);
    document.getElementById('name').value ='';
    document.getElementById('category').value='';
    document.getElementById('deadline').value='';
    document.getElementById('status').value='in progress'
    renderTask()
    
};


addTaskButton.addEventListener('click', addTask);
filterList.addEventListener('change', renderTask);

//this function displays the tasks on the screen, checks overdue
//filters element values, allows progress selection
function renderTask() {
    myUnTaskList.innerHTML = '';
    checkOverdue()
    for (let i = 0; i < myList.length; i++) {
        if (filterList.value !== 'all' && myList[i].statusInput !== filterList.value) {
            continue;
        }
        const newTask = document.createElement('li');
        newTask.textContent = `${myList[i].nameInput} | ${myList[i].categoryInput} | ${myList[i].deadlineInput}`;
        myUnTaskList.appendChild(newTask);
        const selectProgress = document.getElementById("status").cloneNode(true);
        selectProgress.removeAttribute("id");
        selectProgress.value = myList[i].statusInput;
        newTask.appendChild(selectProgress);
        selectProgress.addEventListener('change',()=>{
            myList[i].statusInput = selectProgress.value;
            renderTask()
        })
        
        
    }
}

//function to check overdue. compare the task date to today's day
// and if it is not complete, mark it overdue 

function checkOverdue() {
    const today = new Date().toLocaleDateString('en-CA');
    for (let i = 0; i < myList.length; i++) {
        if (myList[i].deadlineInput !== '' && myList[i].deadlineInput < today && myList[i].statusInput != 'completed'){
            myList[i].statusInput = 'overdue';
        }
    }
}

