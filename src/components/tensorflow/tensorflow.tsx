import React from 'react';
import * as tf from '@tensorflow/tfjs';

const TensorFlowPlayground = () => {
    const tensor = tf.tensor([1, 2, 3, 4]);

    const newTensor = tf.tensor2d([1,2,3,4,5,6], [3,2]);
    const resultTensor = newTensor.add(tf.tensor2d([[1,1], [1,1], [1,1]]));

    newTensor.print();
    resultTensor.print();

    newTensor.dispose();
    resultTensor.dispose();

    const tidyUp = tf.tidy(() => {
        const a = tf.tensor1d([1,2,3]);
        const b = tf.tensor1d([4,5,6]);
        const c = a.add(b);

        tf.keep(b);

        return c;
    });

    const multiplyTensors = tf.tidy(()=> {
        const a = tf.tensor([3,3,3]);
        const b = tf.tensor([2,2,2]);
        return a.mul(b);
    });

    const subtractTensors = tf.tidy(() => {
        const a = tf.tensor1d([3,3,3]);
        const b = tf.tensor2d([1,1,1], [1,3]);
        return a.sub(b)
    });


    // At this point, 'a' and 'b' are disposed of, but 'tidyUp' is not
    console.log(tidyUp.dataSync());  // This will log the result without memory leak

    console.log(multiplyTensors.dataSync())

    console.log(subtractTensors.dataSync());

    // See how many tensors are in memory
    console.log(`Number of tensors: ${tf.memory().numTensors}`);

    return (
        <div>
            <h1>TensorFlow.js Example</h1>
            <p>Tensor shape: {tensor.shape}</p>
            <p>Tensor data: {tensor.dataSync()}</p>
        </div>
    );
};

export default TensorFlowPlayground;
