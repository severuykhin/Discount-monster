<?php

use yii\db\Migration;
use common\models\Product;

/**
 * Handles adding timestamp to table `product`.
 */
class m181126_202118_add_timestamp_column_to_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'created_at', $this->integer());
        $this->addColumn('product', 'updated_at', $this->integer());

        Product::updateAll([
            'created_at' => time(),
            'updated_at' => time()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'created_at');
        $this->dropColumn('product', 'updated_at');
    }
}
