const emoji = require("node-emoji"),
    cliProgress = require("cli-progress"),
    colors = require("ansi-colors");
const lambdas = ["create", "get", "update", "delete", "search"];
main().then(() => {
    console.warn("\n" + 'Improve API performance – monitor it with the Serverless Console: run "serverless --console"' + "\n");
});

async function main() {
    try {
        console.log("\n" + emoji.emojify(":kaaba:") + ' Running "serverless" from node_modules');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("\n" + "Packaging...");
        await new Promise((resolve) => setTimeout(resolve, 3500));
        console.warn("\n" + "Learn more about configuration validation here: http://slss.io/configuration-validation");
        console.log("\n" + emoji.emojify(":kaaba:") + " Deploying transformer to stage master (eu-west-1)");
        const bar = new cliProgress.SingleBar({
            format: colors.red("{bar}") + "| Uploading {action} | {value}/{total}",
            hideCursor: true,
        });
        let value = 0;
        bar.start(Object.keys(lambdas).length, value);
        for (const lambda of lambdas) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            value !== 5 && value++;
            bar.update(value, { action: lambda });
        }
        bar.update(value, { action: "completed" });
        bar.stop();
    } catch (err) {
        return `!!!!!!!!!!!!!! ERROR: ${err.message} !!!!!!!!!!!!!!`;
    }
}
