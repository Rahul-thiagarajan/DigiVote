import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';


window.history.pushState(null, null, window.location.href);
window.onpopstate = function(event) {
    window.history.pushState(null, null, window.location.href);
};
var ABI = [
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "candidateNames",
        "type": "string[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_bytes32",
        "type": "bytes32"
      }
    ],
    "name": "bytes32ToString",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidateList",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCandidateList",
    "outputs": [
      {
        "internalType": "string[]",
        "name": "",
        "type": "string[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTransactionCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "candidateName",
        "type": "string"
      }
    ],
    "name": "totalVotesFor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "candidate",
        "type": "bytes32"
      }
    ],
    "name": "validCandidate",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "candidateName",
        "type": "string"
      }
    ],
    "name": "voteForCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "votesReceived",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
import { Web3Provider } from '@ethersproject/providers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AuthUser() {
  const navigate = useNavigate();
  const [contract, setContract] = useState();
  const [walletAddress, setWalletAddress] = useState('');
  const [epicNumber, setEpicNumber] = useState('');


  useEffect(() => {
    // Load contract
    async function loadContract() {
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractInstance = new ethers.Contract(
          '0x064C58A86a488B58B5763910d8f0555A7683a4bF',
          ABI,
          signer
        );
        const walletAddress = await signer.getAddress();
        setWalletAddress(walletAddress);
        setContract(contractInstance);
      }
    }
    loadContract();
  }, []);

  // Button click
  const handleClick = async () => {
    const userData = {
      walletAddress: walletAddress,
      epicNumber: epicNumber
    }
    try {
      const response = await axios.post('http://localhost:5000/', userData);
      if (response.data) {
        navigate('/authuser');
        
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="login-pg flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className='box-ele '>
    <h1 className="text-3xl mb-4"> EPIC NUMBER </h1><br></br>
    <input
      className="but-inp w-[45%] text-black h-10 mb-4 px-4 rounded border "
      type="text"
      id="epicNumber"
      value={epicNumber}
      onChange={(event) => {setEpicNumber(event.target.value);}}
    />
    <button
      className="but-sub w-[10%] py-2 px-4 bg-red-500 rounded-xl text-white font-semibold"
      onClick={handleClick}
    >
      Submit
    </button>
    </div>
  </div>
  );
}

const styles = {
  textInput: {
    width: '100%',
    height: '30px',
  },
  button: {
    width: '100%',
  }
}


export default AuthUser;
