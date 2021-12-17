import { Input } from "antd";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { ReactDOM } from "react-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

// import from Wallet
import {
  CreateMnemonic,
  NewWalletFromMnemonic,
  EncryptWallet,
  DecryptWallet,
} from "./Wallet";

export default function CreateWallet(props) {
  const creatingmnemonic = async () => {
    console.log("clicked!");
    setShowMnemonic(true);
    let newmnemonic = await CreateMnemonic();
    setGENERATEDmnemonic(newmnemonic);
  };
  const confirmmnemonic = async () => {
    if (USERmnemonic == GENERATEDmnemonic) {
      setShowMnemonic(false);
      setShowPassword(true);
    } else {
      setRetry(true);
    }
  };
  const creatingwallet = async () => {
    let newwallet = await NewWalletFromMnemonic(USERmnemonic);
    let encrypted_wallet = EncryptWallet(newwallet, password);
    localStorage.setItem("myWallet", JSON.stringify(encrypted_wallet));
    localStorage.setItem("myWalletPublic", newwallet.address);
    setShowPassword(false);
    document.location.reload(true);
  };
  const importingmnemonic = async () => {
    setShowImportMnemonic(true);
  };
  const importingwallet = async () => {
    try {
      NewWalletFromMnemonic(USERmnemonic);
      setShowImportMnemonic(false);
      setShowPassword(true);
    } catch (err) {
      console.log(USERmnemonic);
      console.log(err);
      setRetry(true);
    }
  };
  async function handleSubmit(event) {
    event.preventDefault();
  }
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showImportMnemonic, setShowImportMnemonic] = useState(false);
  const [retry, setRetry] = useState(false);
  const [password, setPassword] = useState("");
  const [USERmnemonic, setUSERmnemonic] = useState("");
  const [GENERATEDmnemonic, setGENERATEDmnemonic] = useState("");

  return (
    <div>
      {!(showMnemonic || showPassword || showImportMnemonic) && (
        <>
          <Button onClick={creatingmnemonic}>Create Wallet</Button>
          <Button onClick={importingmnemonic}>Import Wallet</Button>
        </>
      )}

      {showMnemonic && (
        <>
          <div>Your Mnemonic seed:</div>
          <div>{GENERATEDmnemonic}</div>
          <Input
            placeholder="Confirm Your Mnemonic"
            onChange={(event) => setUSERmnemonic(event.target.value)}
            onPressEnter={(event) => confirmmnemonic()}
          />
          {retry && <div>please input your mnemonic seed properly</div>}
        </>
      )}
      {showImportMnemonic && (
        <>
          <Input
            placeholder="Type Your Mnemonic Seed"
            onChange={(event) => setUSERmnemonic(event.target.value)}
            onPressEnter={(event) => importingwallet()}
          />
          {retry && <div>please input your mnemonic seed properly</div>}
        </>
      )}
      {showPassword && (
        <>
          <Input.Password
            placeholder="Type your wallet password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={(event) => setPassword(event.target.value)}
            onPressEnter={(event) => creatingwallet()}
          />
        </>
      )}
    </div>
  );
}
