import React from 'react';
import "./Health.css"

export default function Status() {
    return (
        <div className='H1'>
            <ul className='U2'>
                <div className='Title'>Body Information</div>
                <li>Height: 167 cm</li>
                <li>Weight: 68 kg</li>
                <li>BMI: 24.4</li>
                <li>Blood type: O+</li>
            </ul>
            <br></br>
            <ul className='U2'>
                <div className='Title'>Medical History</div>
                <li>Condition 1: Diabeties</li>
                <li>Date Diagnosed: 24 Jan 2018</li>
                <li>Condition 2: AIDs</li>
                <li>Date Diagnosed: 17 Dec 2021</li>
                <li>Condition 3: (Death)</li>
                <li>Date Diagnosed: 18 Dec 2021</li>
            </ul>
            <br></br>
            <ul className='U2'>
                <div className='Title'>Vaccination Status</div>
                <li>Influenza: True</li>
                <li>Measles: False</li>
                <li>Polio: True</li>
                <li>Covid-19: True</li>
                <li>Diptheria: True</li>
            </ul>
        </div>
    )
}
