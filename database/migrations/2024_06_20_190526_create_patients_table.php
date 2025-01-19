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
        Schema::create('patients', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('First_Name', 20);
            $table->string('Last_Name', 20);
            $table->string('CIN')->nullable();
            $table->string('Category', 20);
            $table->dateTime('Birth_Date')->nullable();
            $table->string('Gender', 20);
            $table->string('Phone', 20)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
