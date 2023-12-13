yaml() {
    python3 -c "import yaml;print(yaml.load(open('$1'), Loader=yaml.FullLoader)$2)"
}

stage=$(yaml ./deploy/cfg.yml "['stage']")

filePath=$*
deployResponse="Si"

echo $*

echo "Vas a realizar un deploy del servicio $1 para la versión $stage, ¿Deseas continuar? [Si, No]"

read response

if [ "$response" == "Si" ]; then

  # Testing ##############################
  echo "Quieres lanzar los tests? [Si, No]" 
  read testingResponse

    if [ "$testingResponse" == "Si" ]; then
    splitPath=(${filePath/'deploy/'/ })
    pathWithoutDeploy=${splitPath[1]}
    pathWithoutServerless=(${pathWithoutDeploy//'serverless.yml'/ })

    testPath=src/#test/dev${pathWithoutServerless} 

    echo running tests at $testPath
    npm test $testPath

    echo "Quieres seguir con el deploy? [Si, No]"

    read userResponse

    deployResponse=${userResponse}
    
    fi
  ##################################

  if [ "$deployResponse" == "Si" ]; then

    if [ -z "$1" ]; then
      echo "missing serverless id"
    fi

    id=$1
    shift

    if [ -e "serverless.yml" ]; then
      rm -f "serverless.yml"
    fi  

    ln -s $id serverless.yml

    if [ "./deploy/shared/apiGateway/serverless.yml" == "$id" ]; then
      echo "Create a custom domain in API Gateway"
      sls create_domain
    fi

    cp $filePath ./temp.yml

    node ./deploy/deployer.js

# Documentation ##############################
  echo "Quieres documentar el microservicio? [Si, No]" 
  read documentationResponse

    if [ "$documentationResponse" == "Si" ]; then
        
    node ./documentation/documentator/application/documentator.js $filePath true
    
    fi
##################################
    
    if [ -e "serverless.yml" ]; then
      rm -f "serverless.yml"
      rm -f "temp.yml"
    fi
  fi

  if [ -e "serverless.yml" ]; then
    rm -f "serverless.yml"
    rm -f "temp.yml"
  fi
fi