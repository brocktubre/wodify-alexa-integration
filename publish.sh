mkdir ./src && cp Announcement.js AnnouncementsIntent.js BestCoachIntent.js Component.js data.json error.json index.js Wod.js WodIntent.js ./src
mkdir -p ./src/node_modules && cp -r node_modules/ ./src/node_modules
zip -r ../upload.zip ./src
cd ..
aws lambda --profile AWSCliUser --region us-east-1 update-function-code --function-name WodifyAlexaIntegration --zip-file fileb://upload.zip
cd ./wodify-alexa-integration
rm ../upload.zip && rm -rf ./src