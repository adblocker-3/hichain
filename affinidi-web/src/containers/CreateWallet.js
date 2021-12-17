import React from 'react';

// import from Wallet
import { CreateMnemonic, NewWalletFromMnemonic, EncryptWallet, DecryptWallet } from './Wallet'

export default function CreateWallet() {
    return (
        <div>
            <button className="primary-button" onClick=''>Create Wallet</button>
            <button className="primary-button" onClick=''>Import Wallet</button>
        </div>
    )
}
