# Train-Scheduler
#### https://jenmaz12.github.io/Train-Scheduler/
In this app, the user first sees a table listing the current trains scheduled. The table includes train name, destination, frequency in minutes, when the next train will be arriving in military time, and how many minutes away that is.

The user then has an option to add a train to the schedule using the form below the table. They can enter train name, destination, first train time in military time, and frequency. This information will be added to the Firebase database and the most recent ten entries will be displayed in the table. The next arrival time and minutes away are calculated using moment.js.