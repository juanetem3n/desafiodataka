# backendTechnicalAssessment

                                        ad88  88          88                               88            88
                                        d8"   ""          88                         ,d    ""            88
                                        88                88                         88                  88
     ,adPPYba,  ,adPPYba,  8b,dPPYba, MM88MMM 88  ,adPPYb,88  ,adPPYba, 8b,dPPYba, MM88MMM 88 ,adPPYYba, 88
    a8"     "" a8"     "8a 88P'   `"8a  88    88 a8"    `Y88 a8P_____88 88P'   `"8a  88    88 ""     `Y8 88
    8b         8b       d8 88       88  88    88 8b       88 8PP""""""" 88       88  88    88 ,adPPPPP88 88
    "8a,   ,aa "8a,   ,a8" 88       88  88    88 "8a,   ,d88 "8b,   ,aa 88       88  88,   88 88,    ,88 88
     `"Ybbd8"'  `"YbbdP"'  88       88  88    88  `"8bbdP"Y8  `"Ybbd8"' 88       88  "Y888 88 `"8bbdP"Y8 88

¡Saludos, valiente aspirante a programador de backend de Cemetery Wind!
Como sabrás, desde la llegada de los Transformers, la humanidad se ve atrapada en medio de un conflicto épico que decidirá el destino de la Tierra y de toda la galaxia.
En nuestra organización, nuestra misión es catalogar a los Tranformers, ya sean Autobots o Decepticons, para diversos propósitos como rastrear sus movimientos, monitorear sus actividades, estudiar su tecnología o utilizar sus habilidades para nuestros propios fines.
Nuestra organización tiene altos estándares y espera que nuestros empleados sean capaces de resolver problemas complejos y cumplir con sus responsabilidades de manera efectiva.
Por ello, antes de que puedas unirte a nuestra causa, tu desafio será cerrar tres tickets importantes.
Aunque pensamos que te puede ser más fácil completarlos en orden, se pueden cerrar de manera independiente. Ten en cuenta que los test no serán superados hasta que todos los tickets estén realizados.

    - Por un lado, necesitamos que, al crear un nuevo registro, se agregue a la información de cada Transformer un número de bastidor (string) en nuestra base de datos.
    Ya hemos preparado la base de datos (mySql) y los tests, así que sólo tendrás que retocar el código ya existente para agregar la referencia.
    El nombre del nuevo campo ha de ser frameNumber, que en la tabla correspondiente (transformer) será la columna frame_number.
    Por último, no olvides retocar el resto de endpoints también para ajustarlos a la nueva realidad.

    - Por otro, nuestra base de datos crece exponencialmente cada día, según nuevos Transformers son añadidos a nuestros registros. Por ello, nuestro frontend ha dejado de ser cómodo, y buscar un Transformer concreto se ha vuelto muy engorroso.
    Por ello, necesitamos un endpoint de búsqueda que nos permita buscar por nombre o nombre de facción.
    Además, queremos que los resultados se paginen, por lo que te pedimos devolver una cantidad de resultados, el numero total de ellos, las páginas y la página actual.
    La respuesta ha de ser un objeto como el siguiente:
    {
     data: "es un array compuesto por la lista de resultados que cumplen con los filtros, limitado al número de resultados pedidos",
     data_per_page: "es un integer que indica la cantidad de resultados devueltos en cada página",
     page: "es un integer que indica la página devuelta",
     total_data: "es un integer que indica la cantidad total de resultados que cumplen con los filtros",
     total_data_sent: "es un integer que indica la cantidad de resultados devueltos en la página actual",
     total_pages: "es un integer que indica la cantidad total de páginas disponibles"
    }
    Ya hemos preparado el archivo searchTransformerList.js y su correspondiente test, pero necesitamos que completes el código y que pase los tests existentes.
    ¡Y no olvides la seguridad!
    Mantener la estructura de trabajo que seguimos en todos los demás endpoints supondrá un plus.

    - Finalmente, todo tu trabajo será en vano si el frontend no puede conectarse a él.
    Trabajamos con AWS y ya hemos preparado todo para el deploy.
    Sólo tendrás que acceder al archivo serverless.yml de tu microservicio y replicar la configuración de otros endpoints para agregar el de búsqueda.
    Una vez hecho esto, ejecuta el script deploy.sh que encontrarás en la raíz del proyecto y sigue las instrucciones.
    Y por supuesto, necesitaremos la documentación del proyecto. Una vez la tengas, envíanosla a back-development@dataka.com.

La base de datos es mySQL version 5.7.42 (en la carpeta root del proyecto tienes un cheatSheet como referencia)
Las tablas de la base de datos con las que trabajarás son las siguientes:

    * transformer:

    ╔══════╦═══════════════╦═══════════════╦══════════════╦════════════════════════════╦══════════════╦══════════════╦═════════════════════════════╦══════════════╦══════════════╗
    ║ uuid ║     name      ║  description  ║ faction_uuid ║         abilities          ║ object_shape ║    image     ║ frame_number                ║  created_at  ║  updated_at  ║
    ╠══════╬═══════════════╬═══════════════╬══════════════╬════════════════════════════╬══════════════╬══════════════╬═════════════════════════════╬══════════════╬══════════════╣
    ║ 1234 ║ "factionName" ║ "description" ║ "5678"       ║ "['ability1', 'ability2']" ║ "car"        ║ "http://url" ║ 'WVGZZZ5NZJM131395'         ║ "2020-12-12" ║ "2020-12-12" ║
    ╚══════╩═══════════════╩═══════════════╩══════════════╩════════════════════════════╩══════════════╩══════════════╩═════════════════════════════╩══════════════╩══════════════╝

    * transformer_faction

    ╔══════════════════════════════════════╦═══════════════╗
    ║ uuid                                 ║ name          ║
    ╠══════════════════════════════════════╬═══════════════╣
    ║ 4ut0b0t0-70ed-493b-a715-8efe5a2a4282 ║ "Autobot"     ║
    ╠══════════════════════════════════════╬═══════════════╣
    ║ d3c3pt1c-0na3-4724-83e1-191b52acf673 ║ "Decepticon"  ║
    ╠══════════════════════════════════════╬═══════════════╣
    ║ th3cr34t-0rs7-4fd0-a0ff-11ee04d80c85 ║ "The creators"║
    ╚══════════════════════════════════════╩═══════════════╝

Los siguientes archivos o directorios no tienen porque ser modificados:

-   .vscode
-   documentation
-   src/#test
-   src/shared
-   deploy/cfg.yml
-   deployer.js
-   \_.mocharc.json
-   .eslintrc.json
-   .gitignore
-   .prettierrc.js
-   cemeteryWindMasterKey.js
-   config.js
-   deploy.sh
-   LICENSE
-   package-lock.json
-   package.json
-   README.md

Si tienes algún tipo de problema, necesitas consejo o simplemente algo no te cuadra, te proporcionamos una lista de ingenieros de contacto que podrán ayudarte: igor.b@data-ka.com o
yoel.m@data-ka.com. Es fácil encontrarles tanto via email como en hangouts, siempre que no estén en la cantina...

¡Te deseamos mucha suerte en esta tarea!

    ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,,,,.
    ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,..   . .... ..  ..,,,,,,,,,,,,,,,,,,,.,,,,,,,.,,.
    ,,,,,,,,,,,,,,,,,,,,,,,,.  . *%.%&/.%, #.# &*(.,&      .,,,,,,,,,,,,,,,,,,,,..,,
    ,,,,,,,,,,,,,,,,,,,.   ,@,*&.%/, (/.&&/#*&/&/...///% @,%..  .,,,,,,,,,,,,,.,,,.,
    ,,,,,,,,,,,,,,,.  ,& @(/.(# /..  .. .  . ....   . .,@ @(,(.&#   ,,,,,,,,,,,,,..,
    ,,,,,,,,,,,,,,,,,.& ,/&.   . ..... .   /    ......  ..  ,%( %,.,,,,,,,,,,,,,,,..
    ,,,,,,,,,,,,,,,,*,.  .        . .   *(&#*#, . . . . &@@&,   .,,,,,,,,,,.,,,,,,,.
    ,,,,,,,,,,,,,,,,,,,,.   (  ..   .    (*.#,..      %@&#**%#@/,,,,,,,,,,,,,.,,,,,,
    ,,,,,,,,,,,,,,,,,,,,   &(,  .  . .#@@@@@@@@@@%,.%@@@@&%&/@@/,,,,,,,,,,,,,....,,,
    ,,,,,,,,,,,,,,,,,,,,       .  .@@@@@@@@@@@@@@@@@@/@@@@@@@@@/,,,,,,,,,,,,,,.,,,,,
    ,,,,,,,,,,,,,,,,,,,,         %@@@@@@@@@@@@@@@@@@@@%@@@@@@@@/,,,,,,,,,,,,,,,,,,,,
    ,,,,,,,,,,,,,,,,,,,,        *@@@@@@@@@@@@@@@@@@@@@@(@@@@@@@/,,,,,,,,,,,,,,,,,,,,
    ,,,,,,,,,,,,,,,,,,,,    .   /@@@@@@@@@@@@@@@@@@@@@@#@@@@@@@/,,,,,,,,,,,.,,,,,,,,
    ,,,,,,,,,,,,,,,,,,,,    .   ,@@@@@@@@@@@@@@@@@@@@@@(@@@@@@@*,,,,,,,,,,,,,,.,,,,,
    ,,,,,,,,,,,,,,,,,,,,    .    &@@@@@@@@@@@@@@@@@@@@@&@@@@@@@*,,,,,,,,,,,,,,,,,,,,
    ,,,,,,,,,,,,,,,,,,,,   .....  (@%..%@@@@@%@@@#.%@%&@@@@@@@@*,,,,,,,,,,,,,,.,,,,,
    ,,,,,,,,,,,,,,,,,,,,    . .  .#@@  .. *@@@* .  .@&@@@@@@@@@*,,,,,,,,,,,.,...,,,,
    ,,,,,,,,,,,,,,,,,,,,    .... .&@@(   *@@@@@....@@@%@@@@@@@@*,,,,,,,,,,,,,,....,,
    ,,,,,,,,,,,,,,,,,,,,         #%&@@@&&@@(,(@@#*%@@(&@@@@@@@@,,,,,,,,,,,,,,,,...,,
    ,,,,,,,,,,,,,,,,,,,,. .  . /@@@@@@&@@@( @ &@@@(@@@@@@@@@@@@.,,,,,,,,,,..,,,,..,,
    ,,,,,,,,,,,,,,,,,,,,,.  .*@@@@@@@@@@/(@@@@@&%@@@@@@@@@@@@@,.,,,,,.,,,,..,.,.....
    ,,,,,,,,,,,,,,,,,,,,,,,.&@@@@@*,@@@@@@((/&@@@@@@,(*@@@@&..,,,,,,,,.,,,,.,,,,,...
    ,,,,,,,,,,,,,,,,,,,,,,,,,,,@@@%.@(/%@@@@@@@@(*#.@@@@&.,,,,,,,,,,,.,,,,,,,.,.,...
    ,,,,,,,,,,,,,,,,,,,,,,,,,,,.,*@@@&@#(#@@(&%@@/%@@&,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,
    ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.,, @@@@@@@@@&@@@/,,,,,,,,,,,,,,,,,,,,,,,,,,.....,.
    ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,@@@@@#.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.....,
    ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,.....

<------{ BONUS }------>

    Las siguientes tareas aportarán valor extra a tu prueba, no dudes en intentarlas en caso de que te sobre tiempo:

    - En el primer ticket, el número de bastidor se considera información altamente sensible. No sería mala idea utilizar un algoritmo de cifrado como aes-256 para guardar la información en la base de datos. En caso de que te animes, utiliza las claves proporcionadas en el archivo cemeteryWindMasterKey.js.
    - En el segundo ticket, añade más filtros, ordenación o todo lo que creas oportuno.
    - Adapta el endpoint delete para que realice un soft-delete. Si realizas esto, ten en cuenta que tendrás que cambiar buena parte de los endpoints y los tests.

PD: Casi nos olvidamos! Para ejecutar el script no tienes mas que escribir en la terminal ./deploy.sh deploy/${nombreDelMicroservicio}/serverless.yml.
