import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionsContract;
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({voteTo:"",totVotes:[],candidateNames:[]});
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        
      } 
      else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const displayCandidatesAndVotes = async () => {
    try {
      const transactionsContract = createEthereumContract();
  
      // Get the list of candidates
      const candidateList = await transactionsContract.getCandidateList();
      const voteList=[]
      // Display each candidate's name and their respective vote count
      for (let i = 0; i < candidateList.length; i++) {
        const candidateName = candidateList[i];
  
        // Get the total votes for the candidate
        const totalVotes =(await transactionsContract.totalVotesFor(candidateName)).toNumber();
        voteList.push(totalVotes);
        
       
        
       
      }
      
      setformData((prevState) => ({
        ...prevState,
        totVotes: voteList,
        candidateNames: candidateList
      }));
      
      
    } catch (error) {
      console.error("Error displaying candidates and votes:", error);
      throw new Error("Error displaying candidates and votes");
    }
  };
  
  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { voteTo } = formData;
        const transactionsContract = createEthereumContract();
        

       
        const tx = await transactionsContract.voteForCandidate(voteTo);

        setIsLoading(true);
        console.log(`Loading - ${tx.hash}`);
        await tx.wait(); // Wait for transaction confirmation
        console.log(`Success - ${tx.hash}`);
        setIsLoading(false);
  
        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        displayCandidatesAndVotes,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
