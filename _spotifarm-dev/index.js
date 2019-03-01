var SpotifyWebApi = require('spotify-web-api-node');
/*
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientSecret: 'b356b8be46b74718a147e19ea965a952',
  clientId: '07492d682dee469995f88877190180ba',
  redirectUri: 'http://localhost:5000/callback'
});
*/

var scopes = ['user-read-private', 'app-remote-control', 'streaming', 'user-modify-playback-state', 'user-read-currently-playing', 'user-read-playback-state', 'user-read-email'],
  redirectUri = 'http://localhost:5000/callback',
  clientId = '07492d682dee469995f88877190180ba',
  state = 'munched';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);



var credentials = {
  clientId: '07492d682dee469995f88877190180ba',
  clientSecret: 'b356b8be46b74718a147e19ea965a952',
  redirectUri: 'http://localhost:5000/callback'
};

var spotifyApi = new SpotifyWebApi(credentials);

var code = "AQCvCAkS-K9oLYORz7yeJVm88cwuq9gDS_u6A8h9FUZqK0aw620ojfK7c8sjW5wxQHL8SNKJYJqlN29iFgObkkPlDl_OMZzE0alAg1CVUCF5CJNpIvy5il3LBXlCV4HVMc7Q6YdAhB3wlfwnLySOb_MkWBl5tTgEUMcumuQOt9tzXYOzqpAgIUmiPfJGd6hsxefvnOQe2b37wmspo71CCyxES0Q691BFTh-c9mjm51LM0paIVqAp5sEfgsNBme9RXUTnVvVIkKTjGfFjd7DdRq8e_dNcGMW1XJWD2KH-CSoJMK1Cn6X9u5XQkw22Z93KXxJEa_k1-nFYkiklZkhFRvhfesYKxx4kkFi1DDM75wqEhPUlx1uGjPgFfh9ZB67O_ca_551Qx0Jr8xtw";
var code = "AQBFfd56fZRh_WZ0Cnq1bre81V_9EVBR9B38pkH6q3mAZnug9Br3gwbJkKPZPi2pykst62XxK-eANoom2fFgIC_yvk_Vepuvk-9GWxCy58vci7ZqTXCZkXMEtxmXW0Sm4t5AAAAOMmwfClCfT6Pd8m3meB57XdUYI5tEZ1tCWHzA7ZHxghoOs6r6-_cA2nj2rRCAL4pBhVA4dNEl5_wjs8RHAQBsTtetg5rg42FQOAiJNsgwPy6REcKkiNxMQFQGHSijvxwyHqfh8Dg93Y2psRQ3oapDEbG5uBzTAl7Ak4B73EX0yfFlHJvmLNR6ky0Z_yRh7feX0GLyNOGvoYr5UxqwNk5UFzJ3XIwPymr-kRPAHk-yVGGnA4FF7c14ujP-gGa4u7u29nxwgNMp"

spotifyApi
  .authorizationCodeGrant(code)
  .then(function(data) {
    console.log('Retrieved access token', data.body['access_token']);

    // Set the access token
    spotifyApi.setAccessToken(data.body['access_token']);

    // Use the access token to retrieve information about the user connected to it
    return spotifyApi.getMe();
  })
  .then(function(data) {
    // "Retrieved data for Faruk Sahin"
    console.log('Retrieved data for ' + data.body['display_name']);

    // "Email is farukemresahin@gmail.com"
    console.log('Email is ' + data.body.email);

    // "Image URL is http://media.giphy.com/media/Aab07O5PYOmQ/giphy.gif"
    console.log('Image URL is ' + data.body.images[0].url);

    // "This user has a premium account"
    console.log('This user has a ' + data.body.product + ' account');
  })
  .catch(function(err) {
    console.log('Something went wrong', err.message);
  });
