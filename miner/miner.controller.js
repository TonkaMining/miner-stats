const MinerModel = require('./miner.model');

function _saveMinerStats(minerStatData, minerId) {
    const miner = new MinerModel(minerStatData);
    miner.minerId = minerId;

    miner.save()
        .catch((error) => {
            console.error('Error saving miner record:', error.message);
        });
}

function saveMinerHistoricalStats(response, minerId) {
    for (let i = 0; i < response.data.length; i++) {
        _saveMinerStats(response.data[i], minerId);
    }
}

module.exports = {
    saveMinerHistoricalStats: saveMinerHistoricalStats
};
