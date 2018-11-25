<?php

use yii\db\Migration;

/**
 * Handles the creation of table `product_gender`.
 */
class m181125_140504_create_product_gender_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('product_gender', [
            'id' => $this->primaryKey(),
            'product_id' => $this->integer(),
            'gender' => $this->integer()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('product_gender');
    }
}
