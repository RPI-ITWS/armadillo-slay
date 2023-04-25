#!/usr/bin/env node
import {etlInstance} from "./etlManager";

function main() {
    etlInstance. run();

}
main(process.argv.slice(2));