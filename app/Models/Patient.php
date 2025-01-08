<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'cin',
        'category',
        'gender',
        'birth_date',
        'phone',
        'status',
    ];    
    
    public function actions()
    {
        return $this->hasMany(Action::class, 'Patient_ID');
    }
    protected $casts = [
        'Birth_Date' => 'datetime',
    ];
}
