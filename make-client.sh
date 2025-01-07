rm -rf projects/rest-swagger-client/src
rm -rf tmp
mkdir -p tmp
SPECURL="https://icherniakov.ru/yt-course/openapi.json"
SPECFILE=tmp/spec.json

wget $SPECURL -O $SPECFILE
    
echo "finished"
docker run --rm --net=host -u="$(id -u)" -v ${PWD}:/local swaggerapi/swagger-codegen-cli:2.4.0 generate \
    -i /local/$SPECFILE \
    -l typescript-angular \
    -o /local/projects/rest-swagger-client/src \
    --additional-properties ngVersion=19.0.6