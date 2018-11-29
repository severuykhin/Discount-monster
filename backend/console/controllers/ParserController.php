<?php

namespace console\controllers;

use Yii;
use yii\helpers\Json;
use yii\console\Controller;
use yii\helpers\Console;
use common\components\parsers\ParserFactory;
use yii\helpers\VarDumper;

class ParserController extends Controller
{

    public function actionIndex()
    {
        $this->stdout(PHP_EOL, Console::BOLD);
        $this->stdout("Main Parser contoller start work\n", Console::BOLD);
        $this->stdout(PHP_EOL, Console::BOLD);

        $stores = ParserFactory::getAll();
        
        try {
            $this->runAll($stores);
        } catch ( Exception $e ) {
            $this->stdout("Main parser: catch exception\n", Console::BOLD);
            return 1;
        }

        return 0;
    }

    private function runAll(array $stores)
    {
        foreach ($stores as $key => $store) {
            // $pid = pcntl_fork();
            $store->parse();
        }
    }
    

}