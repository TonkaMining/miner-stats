const MinerModel = require('./miner.model');

function saveMinerStats(response, minerId, onComplete) {
    const miner = new MinerModel(response.data);
    miner.minerId = minerId;

    miner.save()
        .then(() => onComplete())
        .catch((error) => {
            console.error('Error saving miner record', error);

            onComplete();
        });
}

module.exports = saveMinerStats;
