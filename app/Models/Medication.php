<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medication extends Model
{
    protected $table = 'medications';
    protected $fillable = [
        'medication',
        'medication_class_id',
    ];

    public function medicationClass()
    {
        return $this->belongsTo(MedicationClass::class, 'medication_class_id');
    }

    public function actions()
    {
        return $this->belongsToMany(Action::class, 'action__medications', 'medication_id', 'action_id');
    }
}