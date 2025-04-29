const { isMainThread ,workerData,Worker } = require('worker_threads');

const {pid} = require('node:process');

// new Worker(someFileThatContainsJScode)
//__filename is this file
// recall worker threads are all part of the same process. They share memory
if (isMainThread) {
    new Worker(__filename,{
        workerData:[1,3,4,3]
    });
    new Worker(__filename,{
        workerData:[76,2,3,4]
    });

    console.log(`Main thread process id: ${pid}`)
} else {
    console.log(`Worker ${pid}`);
    console.log(`WD: ${workerData} sorted is = ${workerData.sort()}`)
    // [7,3,4,2].sort()  recall this is a blocking fcn
}


