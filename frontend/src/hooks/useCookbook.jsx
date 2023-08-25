const useCookbook = () => {
  const apiHost = import.meta.env.VITE_API_HOST;
  const apiPath = import.meta.env.VITE_API_PATH;
  const apiPort = import.meta.env.VITE_API_PORT;

  console.log("Host", apiHost, "- Path", apiPath, "- Port", apiPort);

  const apiEndpoint = `${apiHost}:${apiPort}`;
  console.log("API Endpoint", apiEndpoint);

  const getFoods = async () => {
    try {
      const route = `/${apiPath}/food`;
      const endpoint = new URL(route, apiEndpoint);

      console.log("Endpoint", endpoint);

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
      const route = `/${apiPath}/food/${id}`;
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
      const route = `/${apiPath}/search`;
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
      const route = `/${apiPath}/random`;
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
