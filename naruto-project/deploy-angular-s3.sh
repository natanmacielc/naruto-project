#!/bin/bash

set -e

S3_BUCKET_NAME="naruto-project"

BUILD_DIR="./dist/naruto-project"

CLOUDFRONT_DISTRIBUTION_ID="E29HENA65TVI42"

echo "Iniciando build da aplicação Angular..."
npm run build --prod

if [ -d "$BUILD_DIR" ]; then
  echo "Build gerado com sucesso!"
else
  echo "Erro ao gerar o build!"
  exit 1
fi

echo "Removendo todos os arquivos do bucket S3..."
aws s3 rm s3://$S3_BUCKET_NAME --recursive --profile root

echo "Fazendo upload do build para o bucket S3..."
aws s3 cp $BUILD_DIR/ s3://$S3_BUCKET_NAME/ --recursive --profile root

echo "Invalidando cache do CloudFront..."
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*" --query 'Invalidation.Id' --output text --profile root)

if [ $? -eq 0 ]; then
  echo "Cache do CloudFront invalidado com sucesso! ID de invalidação: $INVALIDATION_ID"
else
  echo "Erro ao invalidar o cache do CloudFront!"
  exit 1
fi

echo "Deploy e invalidação de cache concluídos com sucesso!"

echo "Deploy concluído com sucesso!"
