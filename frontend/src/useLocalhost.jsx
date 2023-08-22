const useLocalhost = () => {
  const localhost = import.meta.env.VITE_LOCALSERVER;
  console.log("Adress", localhost);

  const getFoods = async () => {
    console.log("Requesting foods");
    try {
      const results = await fetch(localhost + "/food");
      console.log("Received results", results);
      if (!results.ok) throw new Error("Network error");

      const data = await results.json();
      console.log("Recieved data", data);

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFoodById = async (id) => {
    try {
      const results = await fetch(localhost + `/food/${id}`);
      if (!results.ok) throw new Error("Network error");

      const data = await results.json();

      return data;
    } catch (err) {
      console.log(err.message);
    }
  };

  return { getFoods, getFoodById };
};

export default useLocalhost;
