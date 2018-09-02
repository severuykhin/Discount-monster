<?php

use yii\db\Migration;

/**
 * Handles the creation of table `store`.
 */
class m180802_184226_create_store_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('store', [
            'id' => $this->primaryKey(),
            'name' => $this->string(200)->comment('Имя'),
            'url' => $this->string()->comment('Базовый урл для парсинга'),
            'created_at' => $this->integer()->comment('Дата создания'),
            'updated_at' => $this->integer()->comment('Дата обновления')
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('store');
    }
}
