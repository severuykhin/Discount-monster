<?php

use yii\db\Migration;

/**
 * Handles the creation of table `store`.
 */
class m181027_115855_create_store_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('store', [
            'id' => $this->primaryKey(),
            'name' => $this->string(200)->comment('Имя'),
            'status' => $this->string()->comment('Статус'),
            'slug'       => $this->string()->comment('Слаг'),
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
