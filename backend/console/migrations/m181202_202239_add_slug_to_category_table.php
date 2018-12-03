<?php

use yii\db\Migration;

/**
 * Class m181202_202239_add_slug_to_category_table
 */
class m181202_202239_add_slug_to_category_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('category', 'slug', $this->string());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('category', 'slug');
    }
}
