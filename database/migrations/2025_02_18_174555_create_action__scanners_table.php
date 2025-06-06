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
        Schema::create('action__scanners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('action_id')->constrained('actions', 'id')->onDelete('cascade');
            $table->foreignId('scanner_id')->constrained('scanners', 'id')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action__scanners');
    }
};
