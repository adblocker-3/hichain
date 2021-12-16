import React from 'react';
import Navbar from '../Navbar';

function Settings(){
    return(
        <div>
            <Navbar></Navbar>
            <ul>
                <li>
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">Account Information</a>
                </li>
                <li>
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">Payment Information</a>
                </li>
                <li>
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer">Privacy and Security</a>
                </li>
            </ul>
            <br></br>
            <button className="primary-button">Discard Changes</button>
            <button className="primary-button">Save</button>
        </div>
    );
}

export default Settings;