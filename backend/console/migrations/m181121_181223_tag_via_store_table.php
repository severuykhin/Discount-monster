<?php

use yii\db\Migration;

/**
 * Class m181121_181223_tag_via_store_table
 */
class m181121_181223_tag_via_store_table extends Migration
{
    
    // Use up()/down() to run migration code without a transaction.
    public function up()
    {
        $this->dropTable('tag_via_link');

        $this->createTable('tag_via_store', [
            'id' => $this->primaryKey(),
            'tag_id' => $this->integer(),
            'store_id' => $this->integer()
        ]);
    }

    public function down()
    {
        echo "m181121_181223_tag_via_store_table cannot be reverted.\n";

        return false;
    }
}
