<?php

use yii\db\Migration;

/**
 * Handles the creation of table `item`.
 */
class m180804_130256_create_item_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('item', [
            'id' => $this->primaryKey(),
            'title' => $this->string()->comment('Название'),
            'url' => $this->string()->comment('Ссылка'),
            'price' => $this->string()->comment('Цена'),
            'img'   => $this->string()->comment('Изображение'),
            'store_id' => $this->integer()->comment('Магазин'),
            'created_at' => $this->integer(),
            'updated_at' => $this->integer()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('item');
    }
}
