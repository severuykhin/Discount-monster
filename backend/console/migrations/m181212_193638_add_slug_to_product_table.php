<?php

use yii\db\Migration;

/**
 * Class m181212_193638_add_slug_to_product_table
 */
class m181212_193638_add_slug_to_product_table extends Migration
{

    // Use up()/down() to run migration code without a transaction.
    public function up()
    {
        $this->addColumn('product', 'slug', $this->string());
    }

    public function down()
    {
        $this->dropColumn('propduct', 'slug');
    }
    
}
