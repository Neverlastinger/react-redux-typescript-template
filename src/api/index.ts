let counter = 0;

// A mock function to mimic making an async request for data
export function fetchCount(): Promise<{ data: number; }> {
  console.log('NETWORK: fetchCount');
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: counter }), 500)
  );
}

export const addAmount = (amount: number): Promise<{ data: number }> => {
  console.log('NETWORK: addAmount');
  return new Promise((resolve) => {
    setTimeout(() => {
      counter += amount;
      resolve({ data: counter })
    }, 500);
  })
}
