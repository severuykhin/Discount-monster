<?php

namespace common\components\parsers;

use common\models\Store;
use GuzzleHttp\Client;
use yii\helpers\VarDumper;


class Parser {

	protected $name;
	protected $url;

	protected function getHtml(): string
	{

		$client = new Client();
		$res = $client->request('GET', $this->url);
		$body = $res->getBody();		
		return $body;
	}

	public function load(Store $store): self
	{	
		$this->name = $store->name;
		$this->url  = $store->url;

		return $this;
	}

}