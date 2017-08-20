const WorkerModel = require('./worker.model');

function saveWorkerStats(response, minerId, workerId, onComplete) {
    const worker = new WorkerModel(response.data);
    worker.minerId = minerId;
    worker.workerId = workerId;

    worker.save()
        .then(() => onComplete())
        .catch((error) => {
            console.error('Error saving worker record', error);

            onComplete();
        });
}

module.exports = saveWorkerStats;
