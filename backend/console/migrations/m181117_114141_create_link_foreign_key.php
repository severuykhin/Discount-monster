<?php

use yii\db\Migration;

/**
 * Class m181117_114141_create_link_foreign_key
 */
class m181117_114141_create_link_foreign_key extends Migration
{

    // Use up()/down() to run migration code without a transaction.
    public function up()
    {
        $this->addForeignKey(
            'link_id',
            'link_via_store',
            'link_id',
            'link',
            'id',
            'CASCADE'
        );
    }

    public function down()
    {
        echo "m181117_114141_create_link_foreign_key cannot be reverted.\n";

        return false;
    }
}
