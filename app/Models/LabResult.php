<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LabResult extends Model
{
    protected $table = 'lab_results';
    protected $fillable = [
        'lab_results'
    ];

    // Relationships
    public function actions()
    {
        return $this->belongsToMany(Action::class, 'action__lab_results', 'lab_result_id', 'action_id');
    }
}