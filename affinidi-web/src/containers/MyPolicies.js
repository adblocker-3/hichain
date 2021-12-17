import React from 'react';
import "./MyPolicies.css";



export default function MyPolicies() {
    return (
        <div className='H1'>
            <ul className='U1'>
                <div className='Title1'>Life Insurance</div>
                <li>Policy Number: 1923823</li>
                <li>Status: Active</li>
                <li>Premium Amount: $400</li>
                <li>Premium Due Date: 25 Dec 2021</li>
                <li>Coverage Amount: $1,000,000</li>
            </ul>
            <br></br>
            <ul className='U1'>
                <div className='Title1'>Critical Illness </div>
                <li>Policy Number: 1231862</li>
                <li>Status: Active</li>
                <li>Premium Amount: $300</li>
                <li>Premium Due Date: 26 Dec 2021</li>
                <li>Coverage Amount: $500,000</li>
            </ul>
        </div>
    )
}
