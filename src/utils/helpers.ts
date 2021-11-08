import fs from "fs";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();
let config: (string|number)[];
/**
 * Get a secret value from encrypted volume (for prod)
 * or from the environment (for local)
 * @param key Name of secret
 */
export function getSecret(key: string): string {
    const configPath = process.env.CONFIG_PATH;
    if (!configPath)
        return process.env[key] as string;

    if (!config) {
        config = JSON.parse(fs.readFileSync(configPath as string, 'utf-8'));
    }

    // @ts-ignore
    return config[key] as string;
}