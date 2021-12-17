import React from 'react';
import "./Settings.css";

function Settings(){
    return(
        <div>
            <ul className='U1'>
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
            <div className='btn-container'>
                <button className="btn">Discard Changes</button>
                <button className="btn">Save</button>
            </div>
            
        </div>
    );
}

export default Settings;