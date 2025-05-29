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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->string("description");
            $table->integer("rent");
            $table->integer("size");
            $table->integer("guests");
            $table->integer("floor");
            $table->string("beds");
            $table->boolean("wifi");
            $table->boolean("tv");
            $table->boolean("shower");
            $table->boolean("towels");
            $table->boolean("mini_bar");
            $table->boolean("desk");
            $table->boolean("featured");
            $table->boolean("breakfast");
            $table->boolean("pets");
            $table->integer("discount");


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};
