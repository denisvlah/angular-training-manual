OUT_DIR="src/app/data/services/rest"
rm -rf $OUT_DIR
rm -rf tmp
mkdir -p tmp
SPECURL="https://icherniakov.ru/yt-course/openapi.json"
SPECFILE=tmp/spec.json

wget $SPECURL -O $SPECFILE    

openapi-generator-cli generate -i $SPECFILE \
    -g typescript-angular \
    -o $OUT_DIR \
    --additional-properties fileNaming=kebab-case,withInterfaces=true \
    --generate-alias-as-model

rm -rf tmp

echo "finished"
