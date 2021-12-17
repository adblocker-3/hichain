import React from 'react';

export default function ManageWallet() {
    return (
        <div>
            <h3>
                L1 Balance:
            </h3>
            <button className="primary-button">Deposit</button>
            <button className="primary-button">Withdraw</button>
            <br></br>
            <h3>
                L2 Balance:
            </h3>
            <button className="primary-button">Top-Up</button>
            <button className="primary-button">Withdraw</button>
        </div>
    )
}
