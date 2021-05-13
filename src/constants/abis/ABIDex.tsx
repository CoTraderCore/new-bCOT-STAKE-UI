const ABIDex = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_Router",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount0",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount1",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "pair",
				"type": "address"
			}
		],
		"name": "calculatePoolToMint",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_pool",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_toToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "convertPoolConnectorsToDestanationToken",
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
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_exchange",
				"type": "address"
			}
		],
		"name": "getConnectorsAmountByPoolAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "tokenAmountOne",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenAmountTwo",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "tokenAddressOne",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenAddressTwo",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_wantAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "pair",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "want",
				"type": "address"
			}
		],
		"name": "getPoolAmountByWant",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "liquidity",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Router",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router02",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "fromAmount",
				"type": "uint256"
			}
		],
		"name": "routerRatio",
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
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "fromAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_router",
				"type": "address"
			}
		],
		"name": "routerRatioByCustomRouter",
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
]

export default ABIDex
