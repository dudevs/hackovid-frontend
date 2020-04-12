export const apiCall = async (url, method) => {
  const response = await fetch(url, { method: method });
  switch(response.status) {
    case 200:
      return response.json();
    case 400:
      throw new Error("400");
    case 500:
      throw new Error("500");
    default:
      throw new Error("not working");
  }
}

export const handleError = (err) => {
  switch(err.message) {
    case "400":
      alert('Hi ha hagut un error, prova-ho més tard');
      break;
    case "500":    
      alert('El servei no està disponible');
      break;
    default:
      console.log('Hi ha hagut un error: ' + err);
      alert('Hi ha hagut un error, prova-ho més tard')
      break;
  }
}