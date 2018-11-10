<?php

use yii\helpers\Html;
use yii\bootstrap\ActiveForm;

$this->title = Yii::t('common', 'Login');

?>
<div>
<br>
<br>
<br>
<br>
    <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4" style="text-align: center;">
            <?php $form = ActiveForm::begin(); ?>
                <?= $form->field($model, 'username') ?>
                <?= $form->field($model, 'password')->passwordInput() ?>
                <?= $form->field($model, 'rememberMe')->checkbox() ?>
		        <p>
                    <?= Yii::t('common', 'password-reset') . ' ' . Html::a(Yii::t('common', 'reset-it'), ['site/request-password-reset']) ?>.
		        </p>
                <div class="form-group">
                    <?= Html::submitButton(Yii::t('common', 'Login'), ['class' => 'btn btn-primary']) ?>
                </div>
            <?php ActiveForm::end(); ?>
        </div>
        <div class="col-lg-4"></div>
    </div>
</div>
