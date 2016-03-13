# node-auth-api
Token based authentication system using nodejs.

See the [demo.](http://authapp-anamritraj.rhcloud.com "Hosted on Openshift")

Access tokens will be generated and stored in database once a user is succesfully authenticated. No sessions are maintained. Every time a request is made, the access token must be sent along with the request.

Data from API is returned in json, which would typically contain a token and a message.

A user may deauthorize the token anytime he wants by clicking the 'Logout' button or sending his token as a query paramenter to "/logout".

eg : http://authapp-anamritraj.rhcloud.com/logout?token=YOUR_TOKEN_HERE

# Licence

node-auth-api is licensed under the MIT license. [http://opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)

# Contributing

I'm just a beginner in nodejs. Feel free to branch out and make pull requests. I would highly appreciate if you report any bugs or code-breaks. Thank you.