export const fetchHeadcount = async (): Promise<number> => {
    // Simulate API call with random number between 0 and 100
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomCount = Math.floor(Math.random() * 100);
        resolve(randomCount);
      }, 1000); // Simulate network delay
    });
  };

  