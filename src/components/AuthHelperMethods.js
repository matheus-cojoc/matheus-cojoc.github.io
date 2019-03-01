import decode from 'jwt-decode';

export default class AuthHelperMethods {
    constructor(domain) {
        this.domain = domain || 'http://109.166.141.97:1272'
    }

    login = (username, password) => {
        return this.fetch(`${this.domain}/api/auth/token/obtain/`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            console.log(res);
            this.setToken(res.access)
            return Promise.resolve(res)
        })
    }

    loggedIn = () => {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken(); // Getting token from localstorage
        return !!token && !this.isTokenExpired(token); // handwaiving here
    };
    
    isTokenExpired = token => {
        try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) {
            // Checking if token is expired.
            return true;
          } else return false;
        } catch (err) {
          console.log(err, "expired check failed! Line 42: AuthService.js");
          return false;
        }
    };
    

    setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem("id_token", idToken);
      };
    
      getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem("id_token");
      };
    
      logout = () => {
        // Clear user token and profile data from localStorage
        localStorage.removeItem("id_token");
      };
    
      getConfirm = () => {
        // Using jwt-decode npm package to decode the token
        let answer = decode(this.getToken());
        console.log("Recieved answer!");
        return answer;
      };  

      fetch = (url, options) => {
        // performs api calls sending the required authentication headers
        console.log(url, options);
        const headers = {
          "Content-Type": "application/json"
        };
        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
          headers["Authorization"] = "Bearer " + this.getToken();
        }
    
        return fetch(url, {
          headers,
          ...options
        })
        .then(response => response.json());
      };
    
      _checkStatus = response => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
          // Success status lies between 200 to 300
          return response;
        } else {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      };        
}


