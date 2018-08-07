<?php

use yii\db\Migration;

/**
 * Class m180807_191529_add_column_to_tags_table
 */
class m180807_191529_add_column_to_tags_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->addColumn('tag', 'store_id', $this->integer()->defaultValue(0)->comment('Для магазина'));
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropColumn('tag', 'store_id');        
    }

    /*
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {

    }

    public function down()
    {
        echo "m180807_191529_add_column_to_tags_table cannot be reverted.\n";

        return false;
    }
    */
}
