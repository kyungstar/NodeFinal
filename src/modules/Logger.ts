import winston, { Logger, createLogger, transports, format, config } from 'winston';

import { AppConfig } from "../../config/AppConfig";


// const serverPort = AppConfig.get("SERVER_PORT");
// const databaseUrl = AppConfig.get("DATABASE_URL");

// 표준 로그 레벨 사용
const customLevels: config.AbstractConfigSetLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    silly: 4
}

// 직접 정의한 로그 레벨 색상
const customColors: config.AbstractConfigSetColors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'magenta',
    silly: 'gray'
}

winston.addColors(customColors);

const logger: Logger = createLogger({
    levels: customLevels,
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.colorize(),  // 색상을 보고싶다면 꼭 추가!
        format.printf((info) => `${info.timestamp} - ${info.level}: ${info.message}`),
    ),
    transports: [
        new transports.Console({ level: 'info' }),
        /*new winston.transports.File({
            level: Config.LOG_LEVEL,
            dirname: PATH,
            filename: `_%DATE%.log`,
            maxsize: FILE_SIZE,
            maxFiles: FILE_CNT,
        }),*/

    ]
});

export default logger;
