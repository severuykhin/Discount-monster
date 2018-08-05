<?php

use yii\db\Migration;

/**
 * Handles adding saleprice to table `items`.
 */
class m180805_100509_add_saleprice_column_to_items_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('item', 'price_sale', $this->string(30)->comment('Цена со скидкой'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('item', 'price_sale');
    }
}
