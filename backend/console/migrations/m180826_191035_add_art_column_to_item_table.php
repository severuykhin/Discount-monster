<?php

use yii\db\Migration;

/**
 * Handles adding art to table `item`.
 */
class m180826_191035_add_art_column_to_item_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('item', 'art', $this->string()->comment('Артикул'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('item', 'art');
    }
}
