<?php

use yii\db\Migration;

/**
 * Handles adding slug to table `store`.
 */
class m180818_103632_add_slug_column_to_store_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('store', 'slug', $this->string()->comment('slug'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('store', 'slug');
    }
}
