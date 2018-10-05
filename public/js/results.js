componentDidMount() {
 
    navigator.geolocation.getCurrentPosition(
 
      (position) => {
 
        this.setState({position});
 
      },
 
      (error) => alert(error),
 
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
 
    );
 
  }
 
  fetchData() {
 
    let lat = this.state.position.coords.latitude
 
    let lng = this.state.position.coords.longitude
 
    let latlng = "ll=" + String(lat) + "," + String(lng)
 
    let consumerKey = "***"
 
    let consumerSecret = "***"
 
    let tokenSecret = "***"
 
    let token = "***"
 
    oauth = new OAuthSimple(consumerKey, tokenSecret)
 
    request = oauth.sign({
 
      action: "GET",
 
      path: "https://api.yelp.com/v2/search",
 
      parameters: "term=${input id here}&" + latlng,
 
      signatures: {api_key: consumerKey, shared_secret: consumerSecret, access_token: token, access_secret: tokenSecret},
 
    })
 
    const nav = this.props.navigator
 
    fetch(request.signed_url, {method: "GET"}).then(function(response){
 
      return response.json()
 
    }).then(function(data){
 
      nav.push({
 
        ident: "Results",
 
        data: data
 
      })
 
    }).catch(function(error){
 
      console.log("Error:", error)
 
    })
 
  }