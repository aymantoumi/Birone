<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name', 'last_name', 'cin', 'category', 'gender', 'phone', 'birth_date', 'created_by', 'updated_by'
    ];    
    
    public function actions()
    {
        return $this->hasMany(Action::class, 'Patient_ID');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
    protected $casts = [
        'Birth_Date' => 'datetime',
    ];
}
