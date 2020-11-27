# Build React app with production mode 
yarn build

# Move to folder build
cd build

#Clone index.html to 200.html
cp index.html 200.html

#Start deploy 
surge . aes-encryption-react.surge.sh

