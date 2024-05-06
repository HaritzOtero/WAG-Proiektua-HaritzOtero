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
        Schema::create('gimnasio_erreserbaks', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('gela_id');
            $table->string('gym_erreserba_ordua', 50)->nullable(false);
            $table->date('gym_erreserba_eguna')->nullable(false);
            $table->timestamps();
        
            $table->foreign('user_id')->references('id')->on('usuarioas')->onDelete('cascade');
            $table->foreign('gela_id')->references('id')->on('gelas')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gimnasio_erreserbaks');
    }
};
