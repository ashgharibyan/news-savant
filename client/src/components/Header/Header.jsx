import React from 'react'
import Button from '@mui/material/Button';

import styles from "./Header.module.css"

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.rightSide}>
                <a href="/">
                    <h1>NewsSavant</h1>
                </a>
                {/* <Button className={styles.btnStyle} size='small'>Home</Button> */}
            </div>
            <div className={styles.leftSide}>
                <Button className={styles.btnStyle} size='small'>Login/Sign Up</Button>
            </div>
        </div>
    )
}

export default Header