export const apiCall = async (url) => {
  const response = await fetch(url);
  switch(response.status) {
    case 200:
      return response.json();
    case 400:
      // eslint-disable-next-line
      throw "400";
    case 500:
      // eslint-disable-next-line
      throw "500";
      default:
        // eslint-disable-next-line
      throw "not working";
  }
}

export const handleError = (err) => {
  console.log("ERROR!!: " + err);
}