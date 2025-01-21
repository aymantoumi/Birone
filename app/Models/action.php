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
}