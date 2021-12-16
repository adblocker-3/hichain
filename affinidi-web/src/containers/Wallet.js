import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Checkbox,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";

export default function Wallet(props) {
  const cat = localStorage.getItem("myCat");
  if (typeof cat !== JSON) {
    console.log("no");
  } else {
    console.log("yes");
  }
  console.log(cat);
  return <div></div>;
}
