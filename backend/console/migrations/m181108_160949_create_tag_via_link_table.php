<?php

use yii\db\Migration;

/**
 * Handles the creation of table `tag_via_link`.
 */
class m181108_160949_create_tag_via_link_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('tag_via_link', [
            'id' => $this->primaryKey(),
            'tag_id' => $this->integer(),
            'link_id' => $this->integer()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('tag_via_link');
    }
}
