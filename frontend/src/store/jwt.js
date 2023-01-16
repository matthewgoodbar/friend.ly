async function jwtFetch(url, options = {}) {
    // Set options.method to 'GET' if there is no method.
    options.method = options.method || "GET";
    // Set options.headers to an empty object if there is no headers.
    options.headers = options.headers || {};
    // Set the "Authorization" header to the value of "jwtToken" in localStorage.
    options.headers["Authorization"] = localStorage.getItem("jwtToken");
    
    // If the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json".
    if (options.method.toUpperCase() !== "GET") {
      options.headers["Content-Type"] =
        options.headers["Content-Type"] || "application/json";
    }
  
    // Call fetch with the url and the updated options hash.
    const res = await fetch(url, options);
  
    // If the response status code is 400 or above, then throw an error with the
    // error being the response.
    if (res.status >= 400) throw res;
  
    // If the response status code is under 400, then return the response to the
    // next promise chain.
    return res;
  }
  
  export default jwtFetch;