const {
    createLogger,
    format,
    transports
} = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({
            stack: true
        }),
        format.splat(),
        format.json()
    ),
    defaultMeta: {
        service: 'TianTianFund'
    },
    transports: [
        new transports.File({
            filename: 'error.log',
            level: 'error'
        }),
        new transports.File({
            filename: 'combined.log'
        })
    ]
});

// 如果不是生产环境，也在控制台显示日志
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', error);
    //process.exit(1); // 退出进程
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = logger;