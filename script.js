 // Load tasks from local storage
 document.addEventListener('DOMContentLoaded', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => new Item(task.name, task.completed));
    }
});

class Item {
    constructor(itemName, completed = false) {
        this.createDiv(itemName, completed);
    }

    createDiv(itemName, completed) {
        this.itemBox = document.createElement('div');
        this.itemBox.classList.add('item');

        this.input = document.createElement('input');
        this.input.value = itemName;
        this.input.disabled = true;
        this.input.classList.add('item_input');

        this.editButton = document.createElement('button');
        this.editButton.textContent = "Edit";
        this.editButton.classList.add('editButton');

        this.removeButton = document.createElement('button');
        this.removeButton.textContent = "Delete";
        this.removeButton.classList.add('removeButton');

        this.completeButton = document.createElement('button');
        this.completeButton.textContent = completed ? "Complete" : "Uncomplete";
        this.completeButton.classList.add('completeButton');

        this.itemBox.appendChild(this.input);
        this.itemBox.appendChild(this.editButton);
        this.itemBox.appendChild(this.removeButton);
        this.itemBox.appendChild(this.completeButton);

        document.querySelector('.container').appendChild(this.itemBox);

        this.editButton.addEventListener('click', () => this.edit(this.input));
        this.removeButton.addEventListener('click', () => this.remove(this.itemBox));
        this.completeButton.addEventListener('click', () => this.toggleComplete());
    }

    edit(input) {
        input.disabled = !input.disabled;
    }

    remove(itemBox) {
        itemBox.remove();
        this.updateLocalStorage();
    }

    toggleComplete() {
        this.completeButton.textContent = this.completeButton.textContent === "Complete" ? "Uncomplete" : "Complete";
        this.input.classList.toggle('completed');
        this.updateLocalStorage();
    }

    updateLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = tasks.findIndex(task => task.name === this.input.value);
        if (index !== -1) tasks.splice(index, 1);
        if (this.input.value.trim() !== "") {
            tasks.push({ name: this.input.value, completed: this.completeButton.textContent === "Uncomplete" });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

document.querySelector('.addButton').addEventListener('click', () => {
    const taskName = document.querySelector('.input').value;
    if (taskName.trim() !== "") {
        new Item(taskName);
        document.querySelector('.input').value = "";
    }
});