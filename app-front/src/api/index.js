import { useSigner, useContract } from 'wagmi'
import { abi, contractAddress } from 'src/constant'

export const Todos = ({ status }) => {
  const { data: signer, isError, isLoading } = useSigner()
  contract

  const { contract } = useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: signer
  })
}
