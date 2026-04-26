let plusBtn = document.querySelector('.plus-btn');
let mainAddBtn = document.querySelector('.add-btn');
let inputArea = document.querySelector('.input-area');
let taskList = document.querySelector('.task-list');
let inputTask = document.querySelector('#input-task');
let clearBtn = document.querySelector('.clear-btn');
let sortBtn = document.querySelector('.sort-btn');
let sortDefaultIcon = sortBtn.querySelector('.default-icon');
let sortHoverIcon = sortBtn.querySelector('.hover-icon');

let sorting = true;

function taskSequence() {
    const numbers = taskList.querySelectorAll('.task-number');
    numbers.forEach((item, index) => {
        item.innerText = `${index + 1}. `;
    });
}

sortBtn.addEventListener('click', () => {
    let tasks = Array.from(taskList.querySelectorAll('.task-item'));
    
    if (tasks.length == 0) {
        return;
    }

    if (sorting) {
        tasks.sort((a, b) => {
            let text1 = a.querySelector('.task-content').innerText.toLowerCase();
            let text2 = b.querySelector('.task-content').innerText.toLowerCase();
            
            if (text1 < text2) {
                return 1;
            } else if (text1 > text2) {
                return -1;
            } else {
                return 0;
            }
        });
        
        sortDefaultIcon.src = "./images/Group-90.svg";
        sortHoverIcon.src = "./images/Group-91.svg";
        
        sorting = false;
    } else {
        tasks.sort((a, b) => {
            let text1 = a.querySelector('.task-content').innerText.toLowerCase();
            let text2 = b.querySelector('.task-content').innerText.toLowerCase();
            
            if (text1 < text2) {
                return -1;
            } else if (text1 > text2) {
                return 1;
            } else {
                return 0;
            }
        });
        
        sortDefaultIcon.src = "./images/Group-74.svg";
        sortHoverIcon.src = "./images/Group-73.svg";
        
        sorting = true;
    }

    tasks.forEach(task => taskList.appendChild(task));

    taskSequence();
});

plusBtn.addEventListener('click', () => {
    if (inputArea.style.display == 'none') {
        inputArea.style.display = 'flex';
    }
});

mainAddBtn.addEventListener('click', () => {
    if (inputArea.style.display != 'none') {
        let taskValue = inputTask.value;
        
        if (taskValue != "") {
            let count = taskList.querySelectorAll('.task-item').length + 1;
            
            let taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            
            taskItem.innerHTML = `
                <div class="task-text">
                    <span class="task-number">${count}. </span>
                    <span class="task-content">${taskValue}</span>
                </div>
                <div class="task-actions">
                    <button class="action-btn edit-btn">
                        <img src="./images/edit-1.svg" class="default-icon" alt="Edit">
                        <img src="./images/edit-1-1.svg" class="hover-icon" alt="Edit">
                    </button>
                    <button class="action-btn delete-btn">
                        <img src="./images/Group-56.svg" class="default-icon" alt="Delete">
                        <img src="./images/Group-70.svg" class="hover-icon" alt="Delete">
                    </button>
                </div>
            `;
            
            taskList.appendChild(taskItem);
            
            let editBtn = taskItem.querySelector('.edit-btn');
            let deleteBtn = taskItem.querySelector('.delete-btn');
            let taskContent = taskItem.querySelector('.task-content');
            
            let editing = false;

            editBtn.addEventListener('click', () => {
                if (!editing) {
                    editing = true;
                    let currentText = taskContent.innerText;
                    
                    let inputElement = document.createElement('input');

                    inputElement.type = 'text';
                    inputElement.className = 'edit-input';
                    inputElement.value = currentText;
                    
                    taskContent.innerHTML = '';
                    taskContent.appendChild(inputElement);
                    
                    editBtn.innerHTML = `
                        <img src="./images/add-1.svg" class="default-icon" alt="Save">
                        <img src="./images/add-1-1.svg" class="hover-icon" alt="Save">
                    `;
                } else {
                    let inputElement = taskContent.querySelector('.edit-input');
                    let newValue = inputElement.value;
                    
                    if (newValue != "") {
                        taskContent.innerText = newValue;
                    } else {
                        taskContent.innerText = "Tapşırıq"; 
                    }
                    
                    editing = false;
                    
                    editBtn.innerHTML = `
                        <img src="./images/edit-1.svg" class="default-icon" alt="Edit">
                        <img src="./images/edit-1-1.svg" class="hover-icon" alt="Edit">
                    `;
                }
            });

            deleteBtn.addEventListener('click', () => {
                taskItem.remove();
                taskSequence();
            });
            
            inputTask.value = "";
            inputArea.style.display = 'none';
            taskList.style.display = 'flex';
        }
    }
});

clearBtn.addEventListener('click', () => {
    inputTask.value = "";
});