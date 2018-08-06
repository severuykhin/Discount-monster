<?php

namespace common\components\parsers;

use Yii;
use common\models\Store;
use common\models\Item;
use common\models\Tag;
use GuzzleHttp\Client;
use yii\helpers\VarDumper;
use yii\web\Response;


class Parser {

	protected $name;
	protected $url;


	public function load(Store $store): self
	{	
		$this->name     = $store->name;
		$this->url      = $store->url;
		$this->store_id = $store->id;

		return $this;
	}

	protected function processFilter(Item $item): bool
	{
		foreach($tags as $tag) {
			$result = stripos(strtolower($item->title), $tag->name);
			if ($result) {
				return true;
			}
		}
		return false;
	}

	protected function getHtml($url = null): string
	{

		$client = new Client();
		$requestUrl = $url ? $url : $this->url;
		$res = $client->request('GET', $requestUrl);
		$body = $res->getBody();		
		return $body;
	}

	protected function sendMsg($data)
	{
		$response = Yii::$app->response;
        $response->format = Response::FORMAT_RAW;
        $response->getHeaders()->set('Content-Type', 'text/event-stream');
        echo "id: test" . PHP_EOL;
        echo "data: sdf" . PHP_EOL;
        echo PHP_EOL;
	}
}