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
        Schema::create('action__medications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('action_id')->constrained('actions', 'id')->onDelete('cascade');
            $table->foreignId('medication_id')->constrained('medications', 'id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action__medications');
    }
};
