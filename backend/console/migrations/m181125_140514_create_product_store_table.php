<?php

use yii\db\Migration;

/**
 * Handles the creation of table `product_store`.
 */
class m181125_140514_create_product_store_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('product_store', [
            'id' => $this->primaryKey(),
            'product_id' => $this->integer(),
            'store_id' => $this->integer()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('product_store');
    }
}
