import React, { Component } from 'react'
import styles from './listItem.scss'

const ListItem = ({ title,  children, className }) => {
    const concatinatedClassName = 
        Array.isArray(className) ? className.join(' ') : className || ''
    
    return(
        <div className={`${(concatinatedClassName)} ${styles.itemContainer}`}>
            <div className={styles.titleContainer}>
                <span>{title}</span>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ListItem