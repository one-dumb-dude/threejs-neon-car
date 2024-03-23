import * as tf from '@tensorflow/tfjs'

export default function TensorFlow2() {
    const tensor = tf.tensor([1,2]);
    tensor.add(tf.tensor([1,2])).print();

    return(
        <div>
            <h2>Good Morning</h2>
        </div>
    )
}
