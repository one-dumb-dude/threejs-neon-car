import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import {useCallback, useEffect} from "react";

export default function TensorFlow2() {
    const tensor = tf.tensor([1,2]);
    tensor.add(tf.tensor([1,2])).print();

    const houseSalesDataset = tf.data.csv('/datasets/kc_house_data.csv');

    async function plot(pointsArray: any, featureName: string) {
        await tfvis.render.scatterplot(
            {name: `${featureName} vs House Price`},
            {values: [pointsArray], series: ["original"]},
            {
                xLabel: featureName,
                yLabel: "Price"
            }
        )
    }

    function normalise(tensor: any) {
        const min = tensor.min();
        const max = tensor.max();
        const normalisedTensor = tensor.sub(min).div(max.sub(min));
        return {
            tensor: normalisedTensor,
            min,
            max
        };
    }

    function denormalise(tensor: any, min: any, max: any) {
        const denormalisedTenor = tensor.mul(max.sub(min)).add(min);
        return denormalisedTenor;
    }

    const getCsvData = useCallback(async () => {
        try {
            // const data = await houseSalesDataset.take(10).toArray()
            // console.log(data);

            const points = houseSalesDataset.map(record => ({
                x: record.sqft_living,
                y: record.price
            }));

            await plot(await points.toArray(), "Square Feet");

            // Features (inputs)
            const featureValues = await points.map(p => p.x).toArray();
            const featureTensor = tf.tensor2d(featureValues, [featureValues.length, 1]);

            // Labels (outputs)
            const labelValues = await points.map(p => p.y).toArray();
            const labelTensor = tf.tensor2d(labelValues, [labelValues.length, 1]);

            featureTensor.print();
            labelTensor.print();

            const normalisedFeature = normalise(featureTensor);
            const normalisedLabel = normalise(labelTensor);

            normalisedFeature.tensor.print();
            normalisedLabel.tensor.print();

            denormalise(normalisedFeature.tensor, normalisedFeature.min, normalisedFeature.max).print();

            console.log('siii')
        } catch(e) {
            console.error(e);
        }
    },[houseSalesDataset])

    useEffect(() => {
        getCsvData()
    }, [getCsvData]);

    return(
        <div>
            <h2>Good Morning</h2>
        </div>
    )
}
