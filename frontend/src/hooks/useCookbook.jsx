const useCookbook = () => {
  const apiUrl = import.meta.env.VITE_API_URL || process.env.API_URL;
  const apiPort = import.meta.env.VITE_API_PORT || process.env.API_PORT;

  const apiEndpoint = `${apiUrl}:${apiPort}`;

  const getFoods = async () => {
    try {
      const route = "food";
      const endpoint = new URL(route, apiEndpoint);

      const results = await fetch(endpoint.href);
      if (!results.ok) {
        throw new Error("Network error");
      }

      const data = await results.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFoodById = async (id) => {
    try {
      const route = `food/${id}`;
      const endpoint = new URL(route, apiEndpoint);

      const results = await fetch(endpoint.href);
      if (!results.ok) {
        throw new Error("Network error");
      }

      const data = await results.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const searchFood = async (query) => {
    try {
      const route = "search";
      const endpoint = new URL(route, apiEndpoint);
      const params = new URLSearchParams({
        query,
      });
      endpoint.search = params;

      const results = await fetch(endpoint.href);
      if (!results.ok) {
        throw new Error("Network error");
      }

      const data = await results.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const randomFood = async () => {
    try {
      const route = "random";
      const endpoint = new URL(route, apiEndpoint);

      const results = await fetch(endpoint.href);
      if (!results.ok) {
        throw new Error("Network error");
      }

      const data = await results.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  return { getFoods, getFoodById, searchFood, randomFood };
};

export default useCookbook;
