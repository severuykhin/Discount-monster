<?php

use yii\db\Migration;

/**
 * Handles the creation of table `product_category`.
 */
class m181125_140454_create_product_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('product_category', [
            'id' => $this->primaryKey(),
            'product_id' => $this->integer(),
            'category_id' => $this->integer()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('product_category');
    }
}
