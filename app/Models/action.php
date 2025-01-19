<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class action extends Model
{
    use HasFactory;

    protected $table = 'actions'; 

    protected $fillable = ['patient_id', 'action', 'payment', 'Status', 'created_by', 'updated_by'];


    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class, 'patient_id');
    }
    
}
