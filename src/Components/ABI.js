const ABI=[
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_isClaimAbleStake",
				"type": "bool"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]

export function getABI(){
    return ABI;
}