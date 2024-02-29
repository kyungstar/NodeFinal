import {ConfigMaster} from "../src/entity/AppConfig";
import createEntityManager from "../src/modules/DBHelper";

export default class getConfig {

    private AppConfig: Map<string, any> = new Map<string, any>();

    public async initConfig() {
        const entityManager = await createEntityManager();

        const AppConfigList = await entityManager.find(ConfigMaster, {});

        AppConfigList.map(item => {
            this.AppConfig.set(item.config_key, {
                config_value: item.config_value
            });
        });
    }

}
