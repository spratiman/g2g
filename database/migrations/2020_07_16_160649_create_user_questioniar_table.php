<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserQuestioniarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questioniars', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            $table->ipAddress('ip_address')->nullable();
            $table->json('answers')->nullable();
            $table->json('recommendation')->nullable();
            $table->boolean('status')->default(0);
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
        Schema::dropIfExists('questioniars');
    }
}
