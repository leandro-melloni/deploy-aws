import * as aws from "aws-sdk";

async function activateType(awsRegion) {
    try {
        return "Type activated";
    } catch (err) {
        throw new Error(err);
    }
} 

module.exports = {
    activateType
}