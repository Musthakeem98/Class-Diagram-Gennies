const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(
      "An error occurred while fetching the data."
    ) as any;
    error.response = response;
    throw error;
  }
  return response.json();
};

export default fetcher;
