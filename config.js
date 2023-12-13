const req = require("require-yml");
// Read the YAML file contents
const cfg = req("./deploy/cfg.yml");

function getConfigFile() {
    try {
        // Use the parsed YAML data
        const response = {
            domain: cfg.domain,
            "node-version": cfg.runtimeNode,
            region: cfg.region,
            stage: cfg.stage,
            version: cfg.version,
        };
        return response;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getConfigFile,
};
