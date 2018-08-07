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

	public function getTags(): array
	{
		return Tag::find()
				->where(['store_id' => $this->store_id])
				->orWhere(['store_id' => Tag::STATUS_ALL])
				->all();
	}

	protected function processFilter(Item $item, $tags): bool
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
}