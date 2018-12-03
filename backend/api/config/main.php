<?php
$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'),
    require(__DIR__ . '/../../common/config/params-local.php'),
    require(__DIR__ . '/params.php'),
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-api',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'api\controllers',
    'bootstrap' => ['log'],
    'modules' => [],
    'components' => [
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'response' => [
            'format' => 'json',
            'formatters' => [
                'json' => [
                    'class' => 'yii\web\JsonResponseFormatter',
                    'prettyPrint' => true,
                    'encodeOptions' => JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
                ]
            ]
        ],
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'class' => 'common\components\LangUrlManager',
            'rules' => [
                // V1 Rules
                'v1/main/start' => 'v1/main/start',
                'v1/<controller:\w+>/<id>/<relations>' => 'v1/<controller>/<relations>',
                'v1/<controller:\w+>/<id>' => 'v1/<controller>/index',
                'v1/<controller:\w+>' => 'v1/<controller>/index',
            ]
        ],
        'frontendUrlManager' => [
            'class' => 'yii\web\urlManager',
            'baseUrl' => '/',
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                // '' => 'site/index',
                // '<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
            ]
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'formatter' => [
            'dateFormat' => 'dd.MM.yyyy',
            'datetimeFormat' => 'd MMMM yyyy HH:mm:ss'
        ],
    ],
    'params' => $params,
];
