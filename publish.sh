cd ..
zip -r upload.zip wodify-alexa-integration/
aws lambda update-function-code --function-name WodifyAlexaIntegration --zip-file fileb://upload.zip
rm upload.zip
cd wodify-alexa-integration/