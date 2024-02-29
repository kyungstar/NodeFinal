import createEntityManager from "../src/modules/DBHelper";
import Logger from "../src/modules/Logger";
import {ConfigMaster} from "../src/entity/AppConfig";

export class AppConfig {
    private static _instance: AppConfig;
    private static _config: Record<string, any>;
    private static _isLoaded: boolean = false;

    private constructor() {}

    public static getInstance(): AppConfig {
        if (!this._instance) {
            this._instance = new AppConfig();
        }
        return this._instance;
    }

    public static async loadAppConfig(): Promise<void> {
        if (!this._isLoaded) {
            const entityManager = await createEntityManager();

            // Find config data asynchronously
            const configList = await entityManager.find(ConfigMaster, {});

            this._config = configList.reduce((acc, config) => {
                acc[config.config_key] = config.config_value;
                return acc;
            }, {} as Record<string, any>);

            this._isLoaded = true;
        }
    }

    public static get(key: string): any {
        if (!this._isLoaded) {
            throw new Error("AppConfig is not loaded. Call loadAppConfig first.");
        }

        return this._config?.[key];
    }

    public static set(key: string, value: any): void {
        this._config[key] = value;
    }
}
