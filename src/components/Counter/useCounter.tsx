import { addAmount, fetchCount } from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface Props {
  incrementAmount: number
}

interface Return {
  data: { data: number } | undefined,
  isLoading: boolean,
  increment: () => void
}

const useCounter = ({ incrementAmount }: Props): Return => {
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery('count', fetchCount);

  const { mutate, isLoading: isPosting } = useMutation((amount: number) => (
    addAmount(amount)
  ));

  const increment = () => {
    mutate(Number(incrementAmount), {
      onSuccess: () => {
        queryClient.invalidateQueries('count')
      }
    });
  };

  const isLoading = isFetching || isPosting;

  return {
    data,
    isLoading,
    increment
  }
};

export default useCounter;
