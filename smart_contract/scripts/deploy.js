const main = async () => {
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");
  
  const contractargs=[["surya","rahul","srimathi","sanjay","madhu"]]
  
  const transactionsContract = await transactionsFactory.deploy(...contractargs);
  await transactionsContract.deployed();
  

  console.log("Transactions address: ", transactionsContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};





runMain();

