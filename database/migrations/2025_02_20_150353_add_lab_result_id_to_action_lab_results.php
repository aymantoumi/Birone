<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLabResultIdToActionLabResults extends Migration
{
    public function up()
    {
        Schema::table('action__lab_results', function (Blueprint $table) {
            $table->foreignId('lab_result_id') 
                  ->constrained('lab_results', 'id')
                  ->onDelete('cascade'); 
        });
    }

    public function down()
    {
        Schema::table('action__lab_results', function (Blueprint $table) {
            $table->dropForeign(['lab_result_id']);

            $table->dropColumn('lab_result_id');
        });
    }
}