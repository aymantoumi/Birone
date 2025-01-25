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
            $table->string('first_name', 50);  
            $table->string('last_name', 50);   
            $table->string('cin')->nullable();
            $table->string('category', 50);    
            $table->dateTime('birth_date')->nullable();
            $table->string('gender', 20);
            $table->string('phone', 20)->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users', 'id')->onDelete('set null')->onUpdate('cascade');
            $table->foreignId('updated_by')->nullable()->constrained('users', 'id')->onDelete('set null')->onUpdate('cascade');
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
