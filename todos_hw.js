import { calculateProgress } from "./calculator_hw.js";

const todo1 = {
    title: 'Clean bathroom',
    isCompleted: false,
    difficulty: 4
};

const todo2 = {
    title: 'Laundry',
    isCompleted: false,
    difficulty: 1
};

const todo3 = {
    title: 'Dishes',
    isCompleted: false,
    difficulty: 3
};

const todos = [
    todo1,
    todo2,
    todo3
];

export const initTodos = () => {
    displayTodos();
    updateProgress();
    saveNewItemListener();
    addOrderListeners();
};

const updateProgress = () => {
    document.getElementById('percentage').innerHTML = `${Math.round(calculateProgress(todos) * 100)}%`;
};

const displayTodos = () => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        todoList.innerHTML += `
            <div class="todo-list-item">
                <input type="checkbox" ${todo.isCompleted ? 'checked' : ''}>
                <span class="${todo.isCompleted ? 'complete' : 'incomplete'}">
                ${index+1} - ${todo.title} - ${todo.difficulty}</span>
                <span class="delete-btn">X</span>
            </div>
        `;
    });
    displayMostDifficultItem();
    checkboxEventListeners();

    addRemoveItemListener();
};

const addRemoveItemListener = () => {
    document.querySelectorAll('.delete-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            todos.splice(index, 1);
            displayTodos();
        });
    })
}

const checkboxEventListeners = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((checkbox, index) => {
        checkbox.addEventListener('change', () => {
            todos[index].isCompleted = checkbox.checked;
            displayTodos();
        });
    });
};

const saveNewItemListener = () => {
    document.getElementById('new-item-save').addEventListener('click', () => {   
        const nameNewElement = document.getElementById('new-item-name');
        const difficultyNewElement = document.getElementById('new-item-difficulty');
        
        createNewItem(nameNewElement.value, Number(difficultyNewElement.value)); // szám kékeslilás színű a consoleon
        // value mező értékét csak a gomblenyomás után tudja kiolvasni

        nameNewElement.value = '';
        difficultyNewElement.value = '';
    })
}

const createNewItem = (name, difficulty) => {
    todos.push({title: name, done: false, difficulty}); // difficulty - ha a változó neve és a kulcs amibe az értékét beleteszem, egyezik, elég 1x kiírni
        // todos önmagát manipulálja, ezért nem kell todos = todos.push, a push referencián dolgozik, nem kell return 
    // új referencia létrehozása új tömbbel:
    // ha a todos let és nem const
    /* todos = [
        {
        title: name,
        done: false,
        difficulty
        }, ...todos];  
        spread operatorral a todos elejére teszi be az újat
    */

    /* spread operator működik objecttel is: (egy kifejezésben több spread op. is lehet)

    const baseTodoListItem = {
        done: false,
    }

    todos = [{
        ...baseTodoListItem, - minden kulcs-érték párt belemásol ebbe az objectbe, plusz a title és name mezőket is
        title,
        name,
        done: true, - felül is lehet írni a kulcs értékét, a sorrend számít
    }, ...todos];
    */

    displayTodos();  // újra kell renderelni a tömböt h látszódjon a változás
}

const orderTodosByDifficulty = (direction) => {
    switch(direction) {
        case 'ASC':
            todos.sort((t1, t2) => t1.difficulty - t2.difficulty); // sort - in place dolgozik, nem kell return 
            break;
        case 'DSC':
            todos.sort((t1, t2) => (t1.difficulty - t2.difficulty) * -1); // ellentétes irányba rendezi
            break;
    }
    displayTodos(); 
}

const addOrderListeners = () => {
    document.getElementById('btn-asc').addEventListener('click', () => orderTodosByDifficulty('ASC'));
    document.getElementById('btn-dsc').addEventListener('click', () => orderTodosByDifficulty('DSC'));
}

const displayMostDifficultItem = () => {
    const mostDifficultItemElement = document.getElementById('most-difficult-item');
    const maxDifficult = Math.max(...todos.map(todo => todo.difficulty)); // spread op. kell h a Math-max kezelje(nem tömb kell neki hanem számok sora)
    const mostDifficultItem = todos.find(todo => todo.difficulty === maxDifficult);

    mostDifficultItemElement.innerHTML = `${mostDifficultItem.title} (${mostDifficultItem.difficulty})`;
}