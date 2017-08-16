const StatsService = require('./statsService');

StatsService.getCurrentMinerStats().then(({ data }) => {
    console.log('miner', data);
});

StatsService.getCurrentWorkerStats().then(({ data }) => {
    console.log('worker', data);
});

