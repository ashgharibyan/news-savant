import React from 'react'
import nsRobot from '../../imgs/NewsSavantRobot-clear.png'
import Smarter from '../Smarter/Smarter'
import styles from './Main.module.css'

const Main = () => {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <div>
                    {/* <div style={{display:'flex', alignItems:'end', gap:13}}> */}
                    <h1 className={styles.get}>Get </h1>
                    <h1 className={styles.smarter}><i>SMARTER <br></br> NEWS</i></h1>
                    {/* <Smarter className={styles.testtt}></Smarter> */}
                    {/* </div> */}
                    <h1 className={styles.get}>with NewsSavant</h1>
                </div>
                <div>
                    <p className={styles.desc}>
                        An Artificial Intelligence <br></br> News Application
                    </p>
                </div>
            </div>
            <div className={styles.right}>
                <img className={styles.robotImage} src={nsRobot} />
            </div>
        </div>
    )
}

export default Main