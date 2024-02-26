import { DataSource, EntityManager } from "typeorm";
import { ConfigMaster } from "../entity/AppConfig";

/**
 * Loads configuration based on the provided RUN_MODE and creates an EntityManager.
 * Exits the process if RUN_MODE is not provided.
 */
export default async function createEntityManager(): Promise<EntityManager> {
    // Validate RUN_MODE argument
    if (!process.argv[3]) {
        console.error("Missing RUN_MODE argument. Please provide a valid RUN_MODE.");
        process.exit(1);
    }

    const RUN_MODE = process.argv[3].toLowerCase();

    // Load configuration dynamically
    const Config = require(`../../config/${RUN_MODE}/Config`);

    // Create and configure the data source
    const AppDataSource = new DataSource({
        type: "mysql",
        host: Config.DB.HOST,
        port: Config.DB.PORT,
        username: Config.DB.USERNAME,
        password: Config.DB.PASSWORD,
        database: Config.DB.DATABASE,
        synchronize: true,
        logging: false,
        entities: [ConfigMaster],
        subscribers: [],
        migrations: [],
    });

    // Initialize the data source and return the EntityManager
    try {
        await AppDataSource.initialize();
        return AppDataSource.manager;
    } catch (error) {
        console.error("Error initializing data source:", error);
        process.exit(1);
    }
}