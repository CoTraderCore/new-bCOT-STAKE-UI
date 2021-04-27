const ABIDepositor = [
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_isClaimAbleStake',
        type: 'bool',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: '_isClaimAbleStake',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'roverAmount',
        type: 'uint256',
      },
    ],
    name: 'depositETHAndERC20',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_stakeClaimAble',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_stakeNonClaimAble',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_router',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_rover',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_uniPair',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_roverSale',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'ethInput',
        type: 'uint256',
      },
    ],
    name: 'calculateToSplit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'ethToPool',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'ethToSale',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'percentToSplit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'router',
    outputs: [
      {
        internalType: 'contract IUniswapV2Router02',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rover',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'roverSale',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakeClaimAble',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakeNonClaimAble',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'uniPair',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export default ABIDepositor
