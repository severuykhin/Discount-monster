<?php

use yii\db\Migration;

/**
 * Class m181119_200515_add_gender_to_link_table
 */
class m181119_200515_add_gender_to_link_table extends Migration
{

    // Use up()/down() to run migration code without a transaction.
    public function up()
    {
        $this->addColumn('link', 'gender', $this->integer()->comment('Gender ID'));
    }

    public function down()
    {
        $this->dropColumn('link', 'gender');
    }
}
