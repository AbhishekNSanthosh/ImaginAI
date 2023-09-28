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
import { BeatLoader, GridLoader } from 'react-spinners'
import toast from 'react-hot-toast';
import Aos from 'aos';
import 'aos/dist/aos.css'

const Home = () => {

    const [backgroundImage, setBackgroundImage] = useState("");
    const [query, setQuery] = useState("");
    const [highlightColor, setHighLightColor] = useState('rgb(0, 255, 8)')
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [callCount, setCallCount] = useState(0);
    const [displayQuery, setDisplayQuery] = useState("");

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, [])

    useEffect(() => {

        const storedCallCount = localStorage.getItem('callCount');
        const storedExpirationTime = localStorage.getItem('expirationTime');

        if (storedCallCount && storedExpirationTime) {
            const currentTime = Date.now();
            if (currentTime < parseInt(storedExpirationTime)) {
                setCallCount(parseInt(storedCallCount));
            } else {
                localStorage.removeItem('callCount');
                localStorage.removeItem('expirationTime');
            }
        }
    }, []);

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
        setImageUrl('');
        if (callCount < 3) {
            setDisplayQuery(query);
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

                if (response) {
                    setQuery("");
                }
                setImageUrl(URL.createObjectURL(blob));
                setIsLoading(false);
                setCallCount(callCount + 1);
                localStorage.setItem('callCount', callCount + 1);
                const expirationTime = Date.now() + 12 * 60 * 60 * 1000; // 12 hours in milliseconds
                localStorage.setItem('expirationTime', expirationTime.toString());
            } catch (error) {
                setIsLoading(false);
                console.error('Error:', error);

            }
        } else {
            setQuery('');
            toast.error('Limit exceeded!');
            setTimeout(() => {
                toast('Kindly try after 12 hours',
                    {
                        icon: '🙁',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    }
                );
            }, 300);
        }
    };

    return (
        <div className={styles.container}
            style={{
                backgroundImage: `url(${[backgroundImage]})`,
            }}>
            <div className={styles.wrapper}>
                <div className={styles.wrap}>
                    <div className={styles.row} data-aos="fade-down">
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
                        {isLoading && <BeatLoader color={highlightColor} className={styles.mobile} />}
                        {isLoading && <p>Please wait...</p>}
                        {imageUrl && <img src={imageUrl} alt="" style={{
                            border: `0.1px solid ${highlightColor}`
                        }} className={styles.image} />}
                        {imageUrl && <span className={styles.desc}>
                            {displayQuery}
                        </span>}
                    </div>
                    <div className={styles.row} data-aos="fade-up">
                        <div className={styles.actionRow}>
                            <div className={styles.actionRowItemLeft}>
                                <input onChange={(e) => {
                                    setQuery(e.target.value);
                                }} type="text" value={query} className={styles.input} placeholder='Hey, Generate some images!' />
                            </div>
                            <div className={styles.actionRowItemRight}>
                                <button type='submit' className={styles.submit}
                                    style={{
                                        backgroundColor: highlightColor
                                    }} onClick={() => {
                                        if (query != "") {
                                            handleSubmit()
                                        }
                                    }}
                                    disabled={isLoading}
                                >Generate</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.rowAbout} >

                    <span className={styles.about} >
                        Made with &#128157; by
                        <a className={styles.link} href="https://www.linkedin.com/in/abhishek-santhosh/">
                            <span style={{
                                color: highlightColor
                            }}>&nbsp; Abhishek&nbsp;Santhosh</span>
                        </a>
                    </span>
                </div>
            </div>
        </div >
    )
}

export default Home