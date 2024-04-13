pragma solidity ^0.8.0;

contract Transactions {
   
    mapping (bytes32 => uint256) public votesReceived;
    bytes32[] public candidateList;
    uint256 transactionCount;

    constructor(string[] memory candidateNames) {
        for (uint i = 0; i < candidateNames.length; i++) {
            bytes32 candidateBytes32 = stringToBytes32(candidateNames[i]);
            candidateList.push(candidateBytes32);
        }
    }
    function getCandidateList() view public returns (string[] memory) {
    string[] memory candidates = new string[](candidateList.length);
    for (uint i = 0; i < candidateList.length; i++) {
        candidates[i] = bytes32ToString(candidateList[i]);
    }
    return candidates;
}

  function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
      uint8 i = 0;
      while(i < 32 && _bytes32[i] != 0) {
          i++;
      }
      bytes memory bytesArray = new bytes(i);
      for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
          bytesArray[i] = _bytes32[i];
      }
      return string(bytesArray);
  }

    function stringToBytes32(string memory source) pure private returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }

      function totalVotesFor(string memory candidateName) view public returns (uint256) {
        bytes32 candidateBytes32 = stringToBytes32(candidateName);
        require(validCandidate(candidateBytes32), "Invalid candidate");
        return votesReceived[candidateBytes32];
    }

     function voteForCandidate(string memory candidateName) public {
        transactionCount=transactionCount+1;
        bytes32 candidateBytes32 = stringToBytes32(candidateName);
        require(validCandidate(candidateBytes32), "Invalid candidate");
        votesReceived[candidateBytes32] += 1;
    }

    function validCandidate(bytes32 candidate) view public returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
        if (candidateList[i] == candidate) {
            return true;
        }
    }
    return false;
} function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}