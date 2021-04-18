
### What is WorkerQueue
The main idea behind Work Queues (aka: Task Queues) is to avoid doing a resource-intensive task immediately and having to wait for it to complete. Instead task gets scheduled to be done later. Tasks gets encapsulated as messages and is sent to queue. A worker process running in the background will pop the tasks and eventually execute the job. When you run many workers the tasks will be shared between them.
    further ref : https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html
                  https://www.rabbitmq.com/tutorials/tutorial-two-python.html

## Usage
    This concept is especially useful in web applications where it's impossible to handle a complex task during a short HTTP request window.

## Examples :
    task.js --> Schedules the task to worker queue
    worker.js --> Simulates long running task by using setTimeOut
    runTasks.hs --> A naive shell script to execute multiple tasks

## How does it work:
    run --> 
        1.) node worker.js
        2.) node worker.js      
        3.)`sh runTasks.sh`

        Once you hit runTasks.sh ,10 task gets submitted to the worker queue , thing to note here is RabbitMQ doesn't wait for tasks to be completed by the workers , it pushes the task as messages to queue and as and when workers are free(in this case which is every 3 seconds) the task gets popped from queue.




