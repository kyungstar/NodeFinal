import { ConfigMaster } from "../src/entity/AppConfig"; // Assuming AppConfig is an entity
import createEntityManager from "../src/modules/DBHelper";
import Logger from "../src/modules/Logger";

export class AppConfig {
    private static _instance: AppConfig;
    private static _config: Record<string, any>;
    private constructor() {}

    public static getInstance(): AppConfig {
        if (!this._instance) {
            this._instance = new AppConfig();
        }
        return this._instance;
    }

    public static async loadAppConfig(): Promise<void> { // Return type matches _config
        const entityManager = await createEntityManager();

        // Find config data asynchronously
        const configList = await entityManager.find(ConfigMaster, {});

        this._config = configList.reduce((acc, config) => {
            acc[config.config_key] = config.config_value;
            return acc;
        }, {} as Record<string, any>);

    }

    public static get(key: string): any {
        return this._config?.[key]; // Optional chaining for safe access
    }

    public static set(key: string, value: any): void {
        this._config[key] = value; // No need to check for _config existence now
    }
}
