#!/usr/bin/env node

import { Command } from "commander";
import { init } from "./src/lib/commands.js";

const program = new Command();

program
  .name("Password Manager CLI")
  .description("CLI for Password Manager")
  .version("1.0.0");

init(program);