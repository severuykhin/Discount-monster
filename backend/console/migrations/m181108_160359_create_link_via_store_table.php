<?php

use yii\db\Migration;

/**
 * Handles the creation of table `link_via_store`.
 */
class m181108_160359_create_link_via_store_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('link_via_store', [
            'id' => $this->primaryKey(),
            'link_id' => $this->integer()->comment('Bounded link id'),
            'store_id' => $this->integer()->comment('Bounded store id')
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('link_via_store');
    }
}
