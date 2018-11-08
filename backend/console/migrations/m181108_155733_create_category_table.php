<?php

use yii\db\Migration;

/**
 * Handles the creation of table `category`.
 */
class m181108_155733_create_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('category', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->comment('Название'),
            'status' => $this->string()->comment('Статус')
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('category');
    }
}
