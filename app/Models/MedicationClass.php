<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicationClass extends Model
{
    protected $table = 'medication_classes';

    protected $fillable = [
        'medication_class',
    ];

    public function medications()
    {
        return $this->hasMany(Medication::class, 'medication_class_id');
    }
}
