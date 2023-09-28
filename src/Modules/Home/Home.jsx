import React, { useEffect, useRef, useState } from 'react'
import styles from './Home.module.css'
import axios from 'axios';
import bg1 from '../../assets/bg1.jpg'
import bg2 from '../../assets/bg2.jpg'
import bg3 from '../../assets/bg3.jpg'
import bg4 from '../../assets/bg4.jpg'
import bg5 from '../../assets/bg5.jpg'
import bg6 from '../../assets/bg6.jpg'
import bg7 from '../../assets/bg7.jpg'
import bg8 from '../../assets/bg8.jpg'
import bg9 from '../../assets/bg9.jpg'
import { GridLoader } from 'react-spinners'

const Home = () => {

    const [backgroundImage, setBackgroundImage] = useState("");
    const [query, setQuery] = useState("");
    const [highlightColor, setHighLightColor] = useState('rgb(0, 255, 8)')
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const backgroundImageUrls = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];
    const colors = ['rgb(0, 255, 8)', 'rgb(255, 0, 0)', 'rgb(255, 0, 212)', ' rgb(89, 0, 255)', 'rgb(255, 217, 0)', 'rgb(255, 102, 0)']
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgroundImageUrls.length);
        setBackgroundImage(backgroundImageUrls[randomIndex]);
    }, []);


    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        setHighLightColor(colors[randomIndex]);
    }, []);


    // const handleSubmit = async () => {
    //     console.log("called")
    //     await axios.post('https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5', {
    //         inputs: query

    //     }, {
    //         headers: {
    //             Authorization: "Bearer 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"
    //         }
    //     }).then((res) => {
    //         console.log(res.data)
    //         // res.blob()
    //         setImageUrl(URL.createObjectURL(res.data))
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    const handleSubmit = async () => {
        console.log("called");
        setImageUrl('');
        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
                {
                    inputs: query
                },
                {
                    headers: {
                        Authorization: "Bearer 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"
                    },
                    responseType: 'blob' // Request the response as a binary blob
                }
            );

            // Create a blob object from the response data
            const blob = new Blob([response.data], { type: 'image/png' }); // Adjust the type as needed

            // Create a URL for the blob and set it as the imageUrl
            if (response) {
                setQuery(null);
            }
            setImageUrl(URL.createObjectURL(blob));
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
        }
    };



    return (
        <div className={styles.container}
            style={{
                backgroundImage: `url(${[backgroundImage]})`,
            }}>
            <div className={styles.wrapper}>
                <div className={styles.wrap}>
                    <div className={styles.row}>
                        <span className={styles.title}>
                            Imagin <span className={styles.coloured} style={{
                                color: highlightColor
                            }}>Ai</span>
                        </span>
                        <span className={styles.desc}>
                            Generate some amazing pictures in seconds using the power of AI
                        </span>
                    </div>
                    <div className={styles.row}>
                        {isLoading && <GridLoader color={highlightColor} />}
                        {isLoading && <p>Please wait...</p>}
                        {imageUrl && <img src={imageUrl} alt="" style={{
                            border: `0.1px solid ${highlightColor}`
                        }} className={styles.image} />}
                    </div>
                    <div className={styles.row}>
                        <div className={styles.actionRow}>
                            <div className={styles.actionRowItemLeft}>
                                <input onChange={(e) => {
                                    setQuery(e.target.value);
                                }} type="text" className={styles.input} placeholder='Hey, Generate some images!' />
                            </div>
                            <div className={styles.actionRowItemRight}>
                                <button type='submit' className={styles.submit}
                                    style={{
                                        backgroundColor: highlightColor
                                    }} onClick={() => {
                                        console.log("e")
                                        handleSubmit()
                                    }}>Generate</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rowAbout}>
                    <span className={styles.about}>
                        Made with &#128157; by <span style={{
                            color: highlightColor
                        }}>&nbsp; Abhishek Santhosh</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Home