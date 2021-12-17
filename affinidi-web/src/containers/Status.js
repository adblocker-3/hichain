import React from 'react';

export default function Status() {
    return (
        <div>
            <ul>
                <div>Body Information</div>
                <li>Height: </li>
                <li>Weight: </li>
                <li>BMI: </li>
                <li>Blood type: </li>
            </ul>
            <br></br>
            <ul>
                <div>Medical History</div>
                <li>Condition 1: </li>
                <li>Date Diagnosed: </li>
                <li>Condition 2: </li>
                <li>Date Diagnosed: </li>
                <li>Condition 3: </li>
                <li>Date Diagnosed: </li>
            </ul>
            <br></br>
            <ul>
                <div>Vaccination Status</div>
                <li>Influenza: </li>
                <li>Measles: </li>
                <li>Polio: </li>
                <li>Covid-19: </li>
                <li>Diptheria: </li>
            </ul>
        </div>
    )
}
