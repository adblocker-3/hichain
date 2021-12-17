import React from 'react';
import "./MyPolicies.styled";
import Title from './MyPolicies.styled';


export default function MyPolicies() {
    return (
        <div>
            <ul>
                <Title>
                    Life Insurance
                </Title>
                <li>Policy Number: </li>
                <li>Status: </li>
                <li>Premium Amount: </li>
                <li>Premium Due Date: </li>
                <li>Coverage Amount: </li>
            </ul>
            <br></br>
            <ul>
                <Title>
                    Critical Illness
                </Title>
                <li>Policy Number: </li>
                <li>Status: </li>
                <li>Premium Amount: </li>
                <li>Premium Due Date: </li>
                <li>Coverage Amount: </li>
            </ul>
        </div>
    )
}
