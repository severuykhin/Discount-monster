<?php

namespace common\components\parsers;

use Yii;
use common\models\Store;
use common\models\Item;
use common\models\Tag;
use common\models\Link;
use GuzzleHttp\Client;
use yii\helpers\VarDumper;
use yii\web\Response;


class Parser {

	protected $links;
	protected $store;

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

	protected function processFilter(string $name, $tags): bool
	{
		foreach($tags as $tag) {
			$result = stripos(strtolower($name), $tag->name);
			if ($result) {
				return true;
			}
		}
		return false;
	}

	protected function getHtml($url = null): string
	{
		$client = new Client();
		$res = $client->request('GET', $url);
		$body = $res->getBody();		
		return $body;
	}

	public function parse()
	{
		$this->setStore();
		if (!$this->store) return;

		$this->setLinks();
		if (count($this->links) <= 0) return;
		
		$this->parseLinks();
	}

	public function getName()
	{
		$path = explode('\\', get_class($this));
    	return strtolower(array_pop($path));
	}

	private function setStore()
	{	
		$store = Store::find()->where(['slug' => $this->getName()])->one();
		if (!$store) {
			echo PHP_EOL;
			echo 'WARNING!: ' . $this->getName() . ' : parser. Not find related store';
			echo PHP_EOL;
			return null;
		}

		$this->store = $store;
		return $store;
	}

	private function setLinks()
	{
		$this->links = $this->store->getActiveLinks();
	}

	private function parseLinks()
	{
		foreach($this->links as $link) {
			$this->parseLink($link);
		}
	}
}