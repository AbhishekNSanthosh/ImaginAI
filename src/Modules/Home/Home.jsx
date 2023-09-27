import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'

const Home = () => {

    const [backgroundImage, setBackgroundImage] = useState("");

    const backgroundImageUrls = ['https://img.freepik.com/free-photo/sunny-lake-landscape_1112-155.jpg?w=826&t=st=1695821133~exp=1695821733~hmac=ccf9678b5d025af0fa3e24fb1c82920a0d6b418ab4d5961199e7aec8fb2b9af4', 'https://img.freepik.com/free-photo/golden-hour-early-morning-before-sunrise-lake-tahoe-california_333098-130.jpg?w=740&t=st=1695822095~exp=1695822695~hmac=f193110792fdf768526ddc57f7125384506acf1f14501cad036c01158038393c', 'https://img.freepik.com/premium-photo/wooded-bridge-by-sea-with-sunset-sky_167657-564.jpg?w=826',];
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * backgroundImageUrls.length);
        setBackgroundImage(backgroundImageUrls[randomIndex]);
    }, []);

    return (
        <div className={styles.container}
            style={{
                backgroundImage: `url(${[backgroundImage]})`,
            }}>
            <div className={styles.wrapper}>
                <div className={styles.wrap}>
                    <div className={styles.row}>
                        <span className={styles.title}>
                            Imagin <span className={styles.coloured}>Ai</span>
                        </span>
                        <span className={styles.desc}>
                            Create amazing artworks in seconds using the power of AI
                        </span>
                    </div>
                    <div className={styles.row}>
                        <img src="https://img.freepik.com/free-photo/rear-view-programmer-working-all-night-long_1098-18697.jpg?size=626&ext=jpg&uid=R89673306&ga=GA1.2.267313864.1687966910&semt=ais" alt="" className={styles.image} />
                    </div>
                    <div className={styles.row}>
                        <div className={styles.actionRow}>
                            <div className={styles.actionRowItemLeft}>
                                <input type="text" className={styles.input} placeholder='Hey, Generate some images!' />
                            </div>
                            <div className={styles.actionRowItemRight}>
                                <button className={styles.submit}>Generate</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home