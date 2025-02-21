<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    use HasFactory;

    protected $table = 'actions'; 
    
    protected $fillable = [
        'patient_id',
        'actions_types_id',
        'action',
        'payment',
        'Status',
        'created_by',
        'updated_by',
    ];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    public function actionType()
    {
        return $this->belongsTo(ActionsType::class, 'actions_types_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function medications()
    {
        return $this->belongsToMany(Medication::class, 'action__medications', 'action_id', 'medication_id');
    }

    public function scanners()
    {
        return $this->belongsToMany(Scanner::class, 'action__scanners', 'action_id', 'scanner_id');
    }

    public function labResults()
    {
        return $this->belongsToMany(LabResult::class, 'action__lab_results', 'action_id', 'lab_result_id');
    }

    public function result()
    {
        return $this->hasOne(Result::class, 'action_id');
    }

    public function note()
    {
        return $this->hasOne(Note::class, 'action_id');
    }
}