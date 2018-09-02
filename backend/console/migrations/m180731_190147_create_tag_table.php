<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tag`.
 */
class m180731_190147_create_tag_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('tag', [
            'id' => $this->primaryKey(),
            'name' => $this->string(200)->comment('Имя'),
            'created_at' => $this->integer()->comment('Дата создания'),
            'updated_at' => $this->integer()->comment('Дата обновления')
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('tag');
    }
}
