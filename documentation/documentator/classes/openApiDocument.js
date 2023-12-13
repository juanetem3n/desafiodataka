const changeCase = require("../../../src/shared/changeCase");
const DatakaDate = require("../../../src/shared/datakaDate/datakaDate");
const fs = require("fs"),
    path = require("path"),
    emoji = require("node-emoji"),
    cliProgress = require("cli-progress"),
    colors = require("ansi-colors");
module.exports = class OpenApiDocument {
    constructor(obj) {
        (this.openapi = "3.0.0"),
            (this.info = {
                title: obj?.info?.title || null,
                description: obj?.info?.description || "",
                contact: obj?.info?.contact || {},
                license: obj?.info?.license || {
                    name: obj?.info?.license?.name || "",
                    url: obj?.info?.license?.url || "",
                },
                version: obj?.info?.version || null,
            }),
            (this.servers = obj?.servers || []),
            (this.tags = obj?.info?.tags || []),
            (this.paths = obj?.paths || {}),
            (this.components = obj?.info?.components || {});
    }

    setAllAtributes(obj) {
        const objInCamelCase = changeCase({ object: obj, changeTo: "camelCase" });
        const constructorKeys = Object.keys(this);
        Object.keys(objInCamelCase).forEach((key) => {
            if (constructorKeys.includes(key)) this[key] = obj[key];
        });
        return this;
    }

    setOpenapi(openapi) {
        this.openapi = openapi;
        return this;
    }

    setInfo(info) {
        this.info = info;
        return this;
    }

    setInfoTitle(infoTitle) {
        this.info.title = infoTitle;
        return this;
    }

    setInfoDescription(infoDescription) {
        this.info.description = infoDescription;
        return this;
    }

    setInfoContact(infoContact) {
        this.info.contact = infoContact;
        return this;
    }

    setInfoContactEmail(infoContactEmail) {
        this.info.contact.email = infoContactEmail;
        return this;
    }

    setInfoLicense(infoLicense) {
        this.info.license = infoLicense;
        return this;
    }

    setInfoLicenseName(infoLicenseName) {
        this.info.license.name = infoLicenseName;
        return this;
    }

    setInfoLicenseUrl(infoLicenseUrl) {
        this.info.license.url = infoLicenseUrl;
        return this;
    }

    setInfoVersion(infoVersion) {
        this.info.version = infoVersion;
        return this;
    }

    generateInfoVersion() {
        if (this.info.version) {
            this.info.version = `${new DatakaDate({ TIMEZONE: "Europe/Madrid" })
                .now()
                .getDateString()
                .slice(0, 10)
                .replaceAll("-", ".")}.${JSON.stringify(parseInt(this.info.version.slice(11)) + 1)}`;
        } else {
            this.info.version = `${new DatakaDate({ TIMEZONE: "Europe/Madrid" })
                .now()
                .getDateString()
                .slice(0, 10)
                .replaceAll("-", ".")}.0`;
        }
        return this;
    }

    setServers(servers) {
        this.servers = servers;
        return this;
    }

    addServer(server) {
        this.servers.push(server);
        return this;
    }

    setTags(tags) {
        this.tags = tags;
        return this;
    }

    addTag(tag) {
        this.tags.push(tag);
        return this;
    }

    setPaths(paths) {
        this.paths = paths;
        return this;
    }

    addPath(pathName, path) {
        this.paths[pathName] = path;
        return this;
    }

    getInfoTitle() {
        return this.info.title;
    }

    getInfoVersion() {
        return this.info.version;
    }

    cleanPaths(boundedContext) {
        for (const path in this.paths) {
            path.includes(boundedContext) && delete this.paths[path];
        }
    }

    async save({ upload }) {
        console.log(emoji.emojify(":floppy_disk:"), `Saving, please wait` + "\n");
        let swaggerResponse;
        const filePath = path.join(__dirname, "..", "..", "files", `${this.getInfoTitle()}.json`);
        fs.writeFileSync(filePath, JSON.stringify(this));
        return swaggerResponse ? swaggerResponse : `The documentation have been saved at: ${filePath}`;
    }

    async delete() {
        console.log("Deleting...");
    }
};
