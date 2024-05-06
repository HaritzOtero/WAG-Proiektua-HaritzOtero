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
        Schema::create('igerileku_erreserbas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable(false);
            $table->integer('kalea_id')->unsigned()->nullable(false);
            $table->date('igerileku_erreserba_eguna')->nullable(false);
            $table->string('igeileku_erreserba_ordua', 50)->nullable(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('usuarioas')->onDelete('cascade');
            $table->foreign('kalea_id')->references('id')->on('kaleas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('igerileku_erreserbas');
    }
};
