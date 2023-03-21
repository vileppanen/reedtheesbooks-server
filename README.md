# reedtheesbooks-server

This project contains NodeJS Express backend-server for [`reedtheesbooks-client`](https://github.com/vileppanen/reedtheesbooks-client) implemented with Typescript. The server integrates with New York Times API & enables the client to retrieve list of book genres & top 10 ranked books within each genre, with optional reviews included.

## Prerequisites
In order to query genres & books from the NYT (a.k.a New York Times) API, you need to setup & configure your own API key for it (instructions can be found at https://developer.nytimes.com/get-started).

The backend assumes that the NYT API key is provided via environment variable named `NYT_API_KEY`. More on setting this up for unix systems in the next section(Windows users, go & Google or ChatGPT).

**Do not include the api key in the repository source files**

## How to run

In order to run the server, perform the following steps

1. clone the repo & run `npm ci` in the repo root
2. execute `NYT_API_KEY=<your api key> npm start`