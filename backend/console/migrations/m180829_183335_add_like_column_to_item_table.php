<?php

use yii\db\Migration;

/**
 * Handles adding like to table `item`.
 */
class m180829_183335_add_like_column_to_item_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('item', 'like', $this->integer()->defaultValue(0)->comment('Лайки'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('item', 'like');
    }
}
