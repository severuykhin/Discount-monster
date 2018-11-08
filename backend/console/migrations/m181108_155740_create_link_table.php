<?php

use yii\db\Migration;

/**
 * Handles the creation of table `link`.
 */
class m181108_155740_create_link_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('link', [
            'id' => $this->primaryKey(),
            'name' => $this->string()->comment('Name'),
            'href' => $this->string()->comment('Source'),
            'status' => $this->string()->comment('Status'),
            'category_id' => $this->integer()->comment('Category id'),
            'created_at' => $this->integer()->comment('Creation date'),
            'updated_at' => $this->integer()->comment('Date of update')
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('link');
    }
}
