<?php

namespace console\controllers;

use Yii;
use yii\helpers\Json;
use common\models\Item;
use common\models\Store;
use common\components\parsers\ParserFactory;
use common\components\parsers\Parser;
use yii\console\Controller;

class AsosController extends Controller
{

    public function actionIndex()
    {
		echo "Asos parser run";

		// $this->parse('http://www.asos.com/ru/men/autlet/cat/?cid=27396&currentpricerange=250-30990&nlid=mw|%D0%B0%D1%83%D1%82%D0%BB%D0%B5%D1%82|%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%20%D1%82%D0%B8%D0%BF%D1%83%20%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%B0&refine=attribute_900:3961,1632,1447,1612,1497,1608,1494,1562,2213,2030|brand:17,15723,18,15565,46,12136,13688,75,15675,298,105,15059,3180,202,2943,242,15139,391,396,401,15127,499,2986,15176,13623,589,13621,15622');
		$parser = ParserFactory::get('Asos');
		$parser->store_id = 14;
		$parser->run([
			'url' => 'http://www.asos.com/ru/men/autlet/cat/?cid=27396&currentpricerange=250-30990&nlid=mw|%D0%B0%D1%83%D1%82%D0%BB%D0%B5%D1%82|%D1%81%D0%BE%D1%80%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%20%D1%82%D0%B8%D0%BF%D1%83%20%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%B0&refine=attribute_900:3961,1632,1447,1612,1497,1608,1494,1562,2213,2030|brand:17,15723,18,15565,46,12136,13688,75,15675,298,105,15059,3180,202,2943,242,15139,391,396,401,15127,499,2986,15176,13623,589,13621,15622',
			'gender' => 1,
		]); 		

	}
	
	public function parse(string $url)
	{
		echo $url;
	}
    
}