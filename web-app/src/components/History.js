import React from 'react'
import './Border.css';

export default function History() {
    return (
        <div>
            <h3>
                Transaction History
            </h3>
            <ul>
                <div>Transaction 1</div>
                <li>Amount Transferred: </li>
                <li>Date: </li>
                <button className="primary-button">Click for more information</button>
            </ul>
            <br></br>
            <ul>
                <div>Transaction 2</div>
                <li>Amount Transferred: </li>
                <li>Date: </li>
                <button className="primary-button">Click for more information</button>
            </ul>
            <br></br>
            <ul>
                <div>Transaction 3</div>
                <li>Amount Transferred: </li>
                <li>Date: </li>
                <button className="primary-button">Click for more information</button>
            </ul>
            <br></br>
        </div>
    )
}
