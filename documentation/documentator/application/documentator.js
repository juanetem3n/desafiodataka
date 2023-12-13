const fs = require("fs"),
    path = require("path"),
    emoji = require("node-emoji"),
    cliProgress = require("cli-progress"),
    colors = require("ansi-colors");
const OpenApiDocument = require("../classes/openApiDocument"),
    Server = require("../classes/server"),
    Path = require("../classes/path"),
    RequestBody = require("../classes/requestBody"),
    Schema = require("../classes/schema");
const {
    createSchemaElementFromPayload,
    getParameters,
    getPayloads,
    getDescription,
    getServerlessFileInJSON,
    getPackageJsonFileInJSON,
    getTestPath,
    getHandlerPath,
} = require("../helpers/helpers");
const { getConfigFile } = require("../../../config");

//only for testing, remove the ternary in production
const microserviceServerlessFilePath = path.join(
        __dirname,
        typeof process.argv[2] === "string" ? `../../../${process.argv[2]}` : "../../../deploy/transformer/serverless.yml"
    ),
    upload = process.argv[3] === "true" ? true : false;

const validMethods = ["get", "put", "post", "delete"],
    isCfgYml = microserviceServerlessFilePath.includes("cfg.yml"),
    isSharedFolder = microserviceServerlessFilePath.includes("shared");

main(microserviceServerlessFilePath, upload).then((response) => {
    console.log("\n" + emoji.emojify(":books:"), response + "\n");
});

async function main() {
    try {
        const { stage } = getConfigFile(),
            packageJsonFileInJSON = getPackageJsonFileInJSON();
        const openApiDocument = new OpenApiDocument()
            .addServer(new Server().setUrl(`https://${stage}.lookingdestiny.com`).setDescription(`${stage} environment server`))
            .setInfoTitle(`${packageJsonFileInJSON.name}`)
            .setInfoDescription(`${packageJsonFileInJSON.description}`)
            .setInfoContact(packageJsonFileInJSON.contact)
            .setInfoLicense({ name: `${packageJsonFileInJSON.license}`, url: `${packageJsonFileInJSON.licenseUrl}` })
            .generateInfoVersion();

        const { functions, custom } = getServerlessFileInJSON({ path: microserviceServerlessFilePath }),
            { boundedContext, parentContext, basePath, type, name } = custom;

        console.log("\n" + emoji.emojify(":open_book:"), `Documenting ${boundedContext}, please wait` + "\n");

        openApiDocument.cleanPaths(boundedContext);

        const bar = new cliProgress.SingleBar({
            format: "Endpoints Documented |" + colors.blue("{bar}") + "| {percentage}% || {value}/{total} EPs || Actual: {endpoint}",
            barCompleteChar: emoji.emojify(":blue_book:"),
            barIncompleteChar: emoji.emojify(":notebook:"),
            hideCursor: true,
        });
        bar.start(Object.keys(functions).length, 0);

        for (const functionName of Object.keys(functions)) {
            const endPoints = functions[functionName]?.events || [];
            for (const endPoint of endPoints) {
                let method, path;
                endPoint.http?.method && (method = endPoint.http.method);
                endPoint.http?.path &&
                    (path = endPoint.http.path.replace("${self:custom.basePath}", basePath).replace("${self:custom.type}", type));
                bar.update({ endpoint: path });
                if (validMethods.includes(method) && path) {
                    const testPath = getTestPath({ functions, functionName, boundedContext, parentContext, name });
                    const payloads = await getPayloads({ testPath });
                    const handlerPath = getHandlerPath({ functions, functionName, boundedContext, parentContext, name });
                    const description = await getDescription({ handlerPath });
                    const pathElement = new Path(method).addTag(boundedContext).setDescription(description);
                    const parameters = getParameters({ path });
                    parameters && parameters.forEach((parameter) => pathElement.addParameter(parameter));
                    const requestBody = new RequestBody();
                    const schema = new Schema(payloads.length > 1 ? "oneOf" : "regular");
                    for (let i = 0; i < payloads.length; i++) {
                        const payload = payloads[i];
                        requestBody.addRequestBodyExample(payload, i);
                        const schemaElement = createSchemaElementFromPayload({ payload });
                        payloads.length > 1 ? schema.addSchema(schemaElement) : requestBody.setSchema(schemaElement);
                    }
                    payloads.length > 1 && requestBody.setSchema(schema);
                    pathElement.setRequestBody(requestBody);
                    openApiDocument.addPath(`/${path}`, pathElement);
                }
            }
            await new Promise((resolve) => setTimeout(resolve, 200));
            bar.increment();
        }
        bar.update({ endpoint: "completed" });
        bar.stop();
        console.log("\n");
        return openApiDocument.save({ upload });
    } catch (err) {
        return `!!!!!!!!!!!!!! ERROR: ${err.message} !!!!!!!!!!!!!!`;
    }
}
