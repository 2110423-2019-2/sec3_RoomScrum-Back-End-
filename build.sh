mkdir -p ~/Projects/$APPNAME-$BRANCH &&
cd ~/Projects/$APPNAME-$BRANCH &&
source ~/.bashrc &&
git checkout $BRANCH && git pull origin $BRANCH &&
nvm use --lts &&
yarn &&
yarn build >> build.log && 
pm2 restart $APPNAME-$BRANCH