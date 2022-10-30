const ContentObjects = async (graphqlQuery) => {
  const endpoint = "https://api.spacex.land/graphql/";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery),
  };

  const response = await fetch(endpoint, options);
  const data = await response.json();

  if (data?.data) {
    const result = data?.data;
    // console.log(result);
    return result;
  } else {
    console.log("ERROR ON Query", data?.errors);
    return data.errors;
  }
};

export default ContentObjects;
