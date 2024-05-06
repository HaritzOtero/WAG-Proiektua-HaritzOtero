<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('usuarioas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('izena', 50);
            $table->string('abizena', 50);
            $table->string('gmail', 100);
            $table->string('password', 100);
            $table->string('type', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarioas');
    }
};
