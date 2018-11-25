<?php

use yii\db\Migration;

/**
 * Handles the creation of table `product`.
 */
class m181125_140439_create_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('product', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'uniqueId' => $this->string(),
            'price' => $this->decimal(10,2),
            'price_sale' => $this->decimal(10,2),
            'discount' => $this->integer(),
            'img' => $this->string(),
            'url' => $this->string()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('product');
    }
}
