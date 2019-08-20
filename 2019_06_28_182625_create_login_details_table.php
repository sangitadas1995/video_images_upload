<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLoginDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('login_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('login_id')->nullable();
            $table->enum('user_type', ['0','1','2','3','4','5'])->default('0')->comment('0=empty,1=admin,2=customer,3=supplier,4=shipper,5=news_admin');
            $table->string('browser')->nullable();
            $table->enum('device', ['Desktop','Mobile','Tab'])->nullable();
            $table->string('os')->nullable();
            $table->string('ip')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('login_details');
    }
}
