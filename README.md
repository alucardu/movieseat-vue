# movieseat-vue

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles production build and serve it
```
yarn global add serve
yarn build
serve -s dist
```

### View project on mobile device through ngrok
build the project and serve the dist folder, see above. Download and configure [ngrok](https://ngrok.com/download). Open ngrok.exe:
```
ngrok http 5000  -host-header="localhost:5000"
```
Navigate to to the https address on the mobile device.