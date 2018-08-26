<?php

use yii\db\Migration;

/**
 * Class m180826_164909_add_columns_to_items_table
 */
class m180826_164909_add_columns_to_items_table extends Migration
{

    // Use up()/down() to run migration code without a transaction.
    public function up()
    {
        $this->addColumn('item', 'gender', $this->integer()->comment('Пол'));
        $this->addColumn('item', 'category_id', $this->integer()->comment('Категория'));
    }

    public function down()
    {
        $this->dropColumn('item', 'gender');
        $this->dropColumn('item', 'category_id');
    }
}
