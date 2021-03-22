export const ABIDepositor=[
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

export const ABIWithdraw=[
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_isClaimAbleStake",
				"type": "bool"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
