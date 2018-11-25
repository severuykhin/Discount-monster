<?php

use yii\db\Migration;

/**
 * Handles adding source to table `product`.
 */
class m181125_204415_add_source_column_to_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('product', 'source', $this->string());
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('product', 'source', $this->string());
    }
}
