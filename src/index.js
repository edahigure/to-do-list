import './style.css';

import ListTasks from './taskList.js';

let retDataTemp = [];

if (localStorage.taksListStorage !== undefined) {
  retDataTemp = JSON.parse(localStorage.taksListStorage);
}

const myTask = new ListTasks(retDataTemp);

export { myTask as default };

myTask.inform();
