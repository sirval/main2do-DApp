export const contractAddress = '0x02af9251Be9012EF058582c5917DC948DF5A5058'

export const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      }
    ],
    name: 'NewTodo',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'cancelled',
        type: 'uint256'
      }
    ],
    name: 'toDoCancelled',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'completed',
        type: 'uint256'
      }
    ],
    name: 'toDoCompleted',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ongoing',
        type: 'uint256'
      }
    ],
    name: 'toDoOngoing',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'pending',
        type: 'uint256'
      }
    ],
    name: 'toDoPending',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'isCancelled',
        type: 'uint256'
      }
    ],
    name: 'cancelTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'isCompleted',
        type: 'uint256'
      }
    ],
    name: 'completeTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'status',
        type: 'uint256'
      }
    ],
    name: 'getTodosByStatus',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'title',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'todoTime',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'priority',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'status',
            type: 'uint256'
          }
        ],
        internalType: 'struct Doit.ToDo[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'title',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'description',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'todoTime',
        type: 'string'
      },
      {
        internalType: 'uint256',
        name: 'priority',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'status',
        type: 'uint256'
      }
    ],
    name: 'newTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'isOngoing',
        type: 'uint256'
      }
    ],
    name: 'ongoingTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'todoId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'isPending',
        type: 'uint256'
      }
    ],
    name: 'pendingTodo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
