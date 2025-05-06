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
        Schema::create('customer_reserves_room', function (Blueprint $table) {
            $table->id();
            $table->integer("customer_id");
            $table->integer("room_id");
            $table->date("reservation_date");
            $table->date("reservation_end");
            $table->string("status");
            $table->string("requests");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
